/** @jsx React.createElement */
/** @jsxFrag React.Fragment */

import { ErrorJSON, errorJSON } from "../models/error.ts";
import { FallbackProps, React } from "./deps.ts";

export interface ErrorFallbackProps {
  resetErrorBoundary(): void;
  error: ErrorJSON;
}

export function errorFallbackFactory(
  FallbackComponent: (props: ErrorFallbackProps) => React.ReactElement,
): (props: FallbackProps | ErrorFallbackProps) => React.ReactElement {
  return (
    { resetErrorBoundary, error }: FallbackProps | ErrorFallbackProps,
  ) => (
    <FallbackComponent
      resetErrorBoundary={resetErrorBoundary}
      error={errorJSON(error)}
    />
  );
}

export const ErrorFallback = errorFallbackFactory((
  { resetErrorBoundary, error }: ErrorFallbackProps,
) => (
  <>
    <h2>{error.error}</h2>
    {error.error_description && <p>{error.error_description}</p>}
    {error.error_stack && <pre>{error.error_stack}</pre>}
    <button onClick={() => resetErrorBoundary()}>Try again</button>
  </>
));
