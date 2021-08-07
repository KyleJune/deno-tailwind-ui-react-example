# Deno Tailwind UI React example

I built this example application to show how you can use Tailwind UI and React
with Deno.

The navigation bar is from
[Tailwind UI's preview components list](https://tailwindui.com/preview#component-70a9bdf83ef2c8568c5cddf6c39c2331).
I updated it to use NavLinks from React Router. For the body of each page, I
just have it display the name of the page just to demonstrate that the react
router works.

## Install

```sh
deno run -A https://deno.land/x/packup@v0.0.15/install.ts
deno install --allow-read=. --allow-write=. --allow-net=deno.land,esm.sh,cdn.esm.sh -fq https://deno.land/x/twd@v0.4.5/cli.ts
```

## Development

The twd cli tool will update the style.css file as you make changes to your
application.

```sh
twd -w index.html -o css/style.css
```

The packup cli tool will handle hot reloading of the application during
development.

```sh
packup index.html
```

For classes to be included in the styles.css, you must use the tw template
string around the className.

```tsx
import { React, tw } from "./deps.ts";

export const Example = () => (
  <h2 className={tw`bg-gray-800`}>
    Example
  <h2>
);
```

## Build

If you have not used the twd cli tool yet, you will need to do so to generate
the style.css file for your build.

```sh
twd index.html -o css/style.css
```

The packup cli tool will handle generating a distribution of the application.

```sh
packup build index.html
```
