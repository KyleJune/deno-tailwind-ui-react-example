run:
	deno run -A --config=deno.json main.ts
run-watch:
	deno run -A --watch --config=deno.json main.ts

bundle:
	deno bundle --config=deno.json ./components/main.tsx ./static/main.js
bundle-watch:
	deno bundle --watch --config=deno.json ./components/main.tsx ./static/main.js

fmt:
	deno fmt --config=deno.json
fmt-watch:
	deno fmt --watch --config=deno.json

lint:
	deno lint --config=deno.json
lint-watch:
	deno lint --watch --config=deno.json
