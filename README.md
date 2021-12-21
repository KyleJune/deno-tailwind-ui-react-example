# Deno Tailwind UI React example

I built this example application to show how you can use Tailwind UI and React
with Deno.

The navigation bar is from
[Tailwind UI's preview components list](https://tailwindui.com/preview#component-70a9bdf83ef2c8568c5cddf6c39c2331).
I updated it to use NavLinks from React Router. For the body of each page, I
just have it display the name of the page to demonstrate that the react router
works.

[Click here](https://tailwind-ui-react-example.deno.dev/) to see this example live on deno deploy.

## Development

To start the application, use the `make run` command. While making changes, I
recommend using the `make run-watch` command so that it automatically restarts
when changes are saved.

To create the bundle for the client application, use the `make bundle` command.
While making changes, I recommend using the `make bundle-watch` command so that
a new bundle is generated when changes are saved.

For classes to be included in the style tag when rendered on the server, you
must use the tw template string around the className.

```tsx
import { React, tw } from "./deps.ts";

export const Example = () => (
  <h2 className={tw`bg-gray-800`}>
    Example
  <h2>
);
```

## Deploy

To be able to deploy this application, you must commit the bundle to the repo.
