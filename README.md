# Deno Tailwind UI React example

I built this example application to show how you can use Tailwind UI and React
with Deno.

The navigation bar is from
[Tailwind UI's preview components list](https://tailwindui.com/preview#component-70a9bdf83ef2c8568c5cddf6c39c2331).
I updated it to use NavLinks from React Router. For the body of most pages, I
just have it display the name of the page and update the title to show that
React Router and Helmet are working correctly. The post pages demonstrate using
React Suspense with React Query.

[Click here](https://tailwind-ui-react-example.deno.dev/) to see this example
live on deno deploy.

## Development

To start the application, use the `make run` command. This would run the script
as if it were in production, without any live reloading.

To create the bundle for the client application, use the `make bundle` command.

To start the application in development mode, use the `make run-dev` command. It
will automatically reload the page whenever the server is restarted or a public
file is modified. It will also run make bundle in watch mode so that the page
will reload whenever there is a change that affects the bundle.

For classes to be included in the style tag when rendered on the server, you
must use the tw template string around the className.

```tsx
import { React } from "./deps.ts";
import { TwindContext } from "./twind.tsx";

export const Example = () => {
  const { tw } = useContext(TwindContext);
  return (
    <h2 className={tw`bg-gray-800`}>
      Example
    <h2>
  );
};
```

## Deploy

To be able to deploy this application, you must commit the bundle to the repo.
