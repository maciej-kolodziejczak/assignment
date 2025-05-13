import type { SearchUserResponse } from "../types";

export type APIResponse<T = unknown> = Response & {
  json: () => Promise<T>;
};

export type UnwrappedResponse<T> = Promise<{
  data: T;
  hasNext: boolean;
}>;

/**
 * A factory function to create a "fetcher" function with a base URL and headers.
 * Allows abstracting the fetching logic for different APIs.
 * Provides a typed response and unified error handling.
 */
export const createFetcher = (baseUrl: string, baseHeaders?: HeadersInit) => {
  return async <T>(
    path: string,
    init?: RequestInit
  ): Promise<APIResponse<T>> => {
    const url = new URL(path, baseUrl);
    const headers = new Headers(baseHeaders);

    /**
     * Merge base headers with request headers
     */
    for (const [key, value] of new Headers(init?.headers).entries()) {
      headers.set(key, value);
    }

    const response = await fetch(url.toString(), { ...init, headers }).catch(
      (error) => {
        throw new Error(
          error instanceof Error ? error.message : "Something went wrong"
        );
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong. Try again in a while.");
    }

    return response satisfies APIResponse<T>;
  };
};

/**
 * Unwraps the response from the API and extracts pagination information.
 * This function is specifically designed for GitHub's API responses.
 *
 * @todo Come up with a better and maybe separate GitHub related stuff to a separate module.
 */
const unwrapResponseWithPagination = async <T>(
  response: APIResponse<T>
): UnwrappedResponse<T> => {
  return {
    data: (await response.json()) satisfies T,
    hasNext: response.headers.get("Link")?.includes('rel="next"') ?? false,
  };
};

export const githubFetcher = createFetcher("https://api.github.com", {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
});

export const searchUser = async (q: string, page?: number) =>
  unwrapResponseWithPagination(
    await githubFetcher<SearchUserResponse>(
      `/search/users?q=${q}&per_page=100${page ? `&page=${page}` : ""}`
    )
  );
