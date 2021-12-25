run:
	deno run -A --config=deno.json ${DENO_ARGS} main.ts

run-dev: export APP_ENV = development
run-dev:
	deno run -A --config=deno.json scripts/dev.ts

bundle:
	deno bundle --config=deno.json ${DENO_ARGS} ./components/main.tsx ./public/all/main.js

fmt:
	deno fmt --config=deno.json
fmt-watch:
	deno fmt --watch --config=deno.json

lint:
	deno lint --config=deno.json
