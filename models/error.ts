import { isDevelopment } from "../config.ts";
import { isHttpError } from "./deps.ts";

export interface ErrorJSON {
  error: string;
  error_description?: string;
  error_stack?: string;
}

export function isErrorJSON(error: unknown): error is ErrorJSON {
  return !!error && typeof (error as ErrorJSON).error === "string";
}

export function errorJSON(error: unknown) {
  let body: ErrorJSON | null = null;
  if (error instanceof Error) {
    body = {
      error: error.name,
    };
    const showStack = isDevelopment();
    if (error.message && (showStack || !isHttpError(error) || error.expose)) {
      body.error_description = error.message;
    }
    if (showStack && error.stack) {
      body.error_stack = error.stack;
    }
  } else if (isErrorJSON(error)) {
    body = error;
  } else {
    body = {
      error: "Exception",
      error_description: JSON.stringify(error),
    };
  }
  return body;
}
