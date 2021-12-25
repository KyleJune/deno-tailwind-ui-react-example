import { Context, ContextSendOptions, isHttpError } from "../deps.ts";

export async function trySend(
  context: Context,
  options: ContextSendOptions,
): Promise<string | undefined> {
  try {
    return await context.send(options);
  } catch (error) {
    if (!isHttpError(error) || error.status !== 404) {
      console.error(error);
      throw error;
    }
  }
}
