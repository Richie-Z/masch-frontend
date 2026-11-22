# CinemaXIX frontend — technical notes

Companion to the README. This repository is only the browser frontend; all persistence and authorization live in the separate `Solo/masch-backend` service.

## Stack

Exact versions come from `package-lock.json` (lockfileVersion 1), which is the source of truth here; `package.json` only declares compatible ranges.

- Vue 2.6.11 (`package.json` declares `^2.6.11`) — `package-lock.json`
- vue-router 3.4.3, history mode — `package-lock.json`, `src/router.js:122`
- bootstrap-vue 2.16.0, vue-sweetalert2 3.0.8, laravel-vue-pagination 2.3.1, core-js 3.6.5 — `package-lock.json`, `src/main.js:4-5,12,18`
- @vue/cli-service 4.5.3 (Vue CLI 4) — `package-lock.json`; plugins declared `~4.5.0` in `package.json:18-20`

JavaScript browser bundle, npm. `npm run serve` maps to `vue-cli-service serve` and `npm run build` to `vue-cli-service build` (`package.json:6-7`). There is no `node` engine field in `package.json`; Node 16 is a containerization pin chosen for Vue CLI 4 compatibility (`CONTAINERIZE.md:16-17`), not a lockfile fact.

## Architecture

No server-side controller exists. The built `index.html` (from `public/index.html`, `<div id="app">` at line 16) is the document root at `/usr/share/nginx/html`, and the JS entry is `src/main.js:1-22`. nginx serves static files only — no PHP/FPM and no Node process at runtime (`Dockerfile:8-12`).

All 16 routes are client-side Vue Router routes (`src/router.js:25-120`) in history mode (`src/router.js:122`), so every deep link depends on nginx's `try_files $uri $uri/ /index.html` SPA fallback (`.containerize/nginx-spa.conf.template:7-9`); without it a non-`/` link 404s. There is no queue, scheduler, or background work (`queue_scheduler: false`), and no boot-time side effects (`boot_side_effects: false`).

`src/views/Dashboard.vue` and `src/components/HelloWorld.vue` are present but unimported by `src/router.js` and are dead code.

## Data model

There is no database, ORM, migration, or schema dump in this repository. The entity shapes below are reconstructed only from the fields the views bind to API JSON; the authoritative schema belongs to `masch-backend` and is `UNKNOWN — requires human input`.

- `branch` — `id`, `name`; referenced by studio via `branch_id` and by schedule filtering — `src/views/branch/Branch.vue:20-27`, `src/views/studio/createStudio.vue:26-29`, `src/views/Schedule.vue:75-82`
- `studio` — `id`, `name`, `branch_id`, `branch_name`, `basic_price`, `aditional_friday_price`, `aditional_saturday_price`, `aditional_sunday_price` — `src/views/studio/Studio.vue:12-34`
- `movie` — `id`, `name`, `minute_length`, `picture_url` — `src/views/movie/Movie.vue:14-24`
- `schedule` — `id`, `movie_id`/`movie_name`, `studio_id`/`studio_name`, `branch_name`, `start`, `end`, `price`, `start_time`; joins movie, studio, and branch server-side — `src/views/schedule/Schedule.vue:15-30`
- `user` — `name`, `username`, `password`, `c_password` on registration; `details.name` for profile — `src/views/Register.vue:38-60`, `src/views/Login.vue:32-45`

Gap: every entity above (`branch`, `studio`, `movie`, `schedule`, `user`) is queried with no migration and no dump in this repo. No tables are created here — the frontend owns no schema at all.

## Auth

An opaque token from the backend login response is stored in browser `localStorage` under `token` and sent as `Authorization: Bearer <token>` (`src/views/Login.vue:31-45`, `src/router.js:126-127`). A global `router.beforeEach` (`src/router.js:129-151`) enforces the 12 `meta.authOnly` routes by redirecting to `/login?redirect=...` when the token is absent, and `meta.guestOnly` routes by redirecting to `/` when a token is present. Logout POSTs `/api/v1/logout`, removes the token, and redirects home (`src/components/Navigation.vue:66-76`).

The guard is client-side only: nginx serves the same static bundle to every visitor, so `authOnly` is bypassable by editing browser storage. Whether `masch-backend` enforces real authorization is `UNKNOWN — requires human input`. There is no password-reset flow. `/user/schedule` is marked `guestOnly`, so a logged-in visitor is redirected away from the public schedule (`src/router.js:106,140-145`).

## External services

Only `masch-backend`, at base `http://127.0.0.1:8000/api/v1`, hardcoded as a literal string in every fetch call (not axios, no `baseURL`, no env var) — for example `src/views/Login.vue:32`, `src/views/branch/Branch.vue:44`, `src/views/Schedule.vue:60,68,75`. Distinct endpoints consumed: `login`, `register/`, `logout`, `details`, `branches`, `branch`, `branch/:id`, `studio`, `studio/:id`, `movie`, `movie/:id`, `schedule`, `schedule/:id`, `schedule/filter`, `user/schedule`. Movie posters load from an external `picture_url` supplied by the API (`src/views/movie/Movie.vue:21`).

Env var names: none. `.env.example` does not exist and there is no `config/` directory. Only webpack built-ins are referenced: `BASE_URL` (`src/router.js:123`) and `NODE_ENV` (`.eslintrc.js:16-17`). The API host is a build-time literal and is not runtime-configurable.

## Operational risks

- The API host `http://127.0.0.1:8000` appears in roughly 37 fetch calls. From a browser it resolves to the visitor's own machine, so outside localhost development every data-dependent screen is non-functional and there is no override (`src/views/Login.vue:32`, `src/views/studio/Studio.vue:54`, `src/views/movie/Movie.vue:50`, among others).
- Image smoke cannot detect this: nginx returns HTTP 200 for the static shell regardless of whether the API answers. `.containerize/validation.env` records `SMOKE=PASS`, `SMOKE_HTTP=200`, `SMOKE_DB=skipped`.
- Bearer token in `localStorage` is readable by any script and has no expiry handling in source (`src/views/Login.vue:45`, `src/router.js:127`).
- The Node 16 build image is EOL; it is pinned for Vue CLI 4, so upgrading requires a CLI migration (`Dockerfile:1`, `CONTAINERIZE.md:16-17`).
- No `vue.config.js` exists; webpack `publicPath` defaults to `/`, so serving under a sub-path breaks asset URLs.
- `CONTAINERIZE.md:19-21` holds three conflicting "Smoke results" lines, two describing an unrelated "legacy mysqli app"; treat only `.containerize/validation.env` as current.
- No boot-time side effects, no queue or scheduler, no writable paths, and no in-container ephemeral state needing a volume — the only state is the browser token. Nothing here breaks above one replica: static assets are identical and sessions live in the browser. Hardcoded credentials: none found.

## Container layout

Two-stage image: `node:16-alpine` runs `npm ci` then `npm run build` (`Dockerfile:1-6`); `nginxinc/nginx-unprivileged:1.27-alpine` copies only `dist/` and the templated nginx config into `/usr/share/nginx/html` and serves on port 8080 (`Dockerfile:8-12`). No process manager. Deep links work only through the `try_files` fallback injected at `Dockerfile:10`.

Repo-local fixes beyond generated files: none — the Node 16 pin for Vue CLI 4 and an unverified Jenkins `node` agent label are flagged in `CONTAINERIZE.md:16-17`. This repo is not one of the six never-re-render repos; re-render is reproducible per the workspace containerization matrix.
