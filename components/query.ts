import { ErrorJSON, errorJSON } from "../models/error.ts";
import { QueryClient } from "./deps.ts";

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
      },
    },
  });

/**
 * Query a REST api. Use this function in place of fetch. It will return the response json if the response is ok,
 * otherwise it will try to throw the response json. If an error is thrown when fetching or parsing the response as json,
 * the exception thrown will be converted into an ErrorJSON.
 */
export async function queryApi<T>(
  info: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  let response: Response | null = null;
  let data: T | ErrorJSON | null = null;
  try {
    response = await fetch(info, init);
    data = await response.json() as (T | ErrorJSON);
  } catch (error) {
    console.error("queryApi error", error);
    throw errorJSON(error);
  }
  if (!response.ok) throw data;
  return data as T;
}

/**
 * Creates a post request to the REST api. Use this function in place of fetch.
 * The default Content-Type header is application/json.
 * If you override headers, the default Content-Type header does not apply.
 */
export async function postApi<T>(
  info: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  const headers = new Headers(
    init?.headers ?? { "Content-Type": "application/json" },
  );
  return await queryApi<T>(info, {
    method: "POST",
    headers,
    ...init,
  });
}
