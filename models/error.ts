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

export function errorJSON(error: unknown): ErrorJSON {
  let errorJSON: ErrorJSON;
  if (error instanceof Error) {
    errorJSON = {
      error: error.name,
    };
    const showStack = isDevelopment();
    if (error.message && (showStack || !isHttpError(error) || error.expose)) {
      errorJSON.error_description = error.message;
    }
    if (showStack && error.stack) {
      errorJSON.error_stack = error.stack;
    }
  } else if (isErrorJSON(error)) {
    errorJSON = error;
  } else {
    errorJSON = {
      error: "Exception",
      error_description: JSON.stringify(error),
    };
  }
  return errorJSON;
}
