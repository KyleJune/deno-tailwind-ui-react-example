import { QueryClient } from "../components/deps.ts";
import { createQueryClient } from "../components/query.ts";
import { Context, ContextSendOptions, Middleware } from "../deps.ts";
import { isHttpError } from "../models/deps.ts";

export async function trySend(
  context: Context,
  options: ContextSendOptions,
): Promise<string | undefined> {
  try {
    return await context.send(options);
  } catch (error) {
    if (!isHttpError(error) || error.status !== 404) {
      throw error;
    }
  }
}

export interface AppState {
  queryClient?: QueryClient;
}

/** Returns a query client for the request. If one does not already exist, it will create one. */
export function getQueryClient(context: Context<AppState>): QueryClient {
  return context.state.queryClient ??
    (context.state.queryClient = createQueryClient());
}

/** Middleware for adding queryClient to request state if it is not already present. */
export const queryClientRoute: Middleware<AppState> = (context, next) => {
  getQueryClient(context);
  next();
};
