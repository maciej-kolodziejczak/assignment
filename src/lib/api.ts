import type {
  PaginatedResponse,
  SearchUserResponse,
  UserResponseModel,
} from "../types";

export async function searchUser(
  q: string,
  page?: number
): Promise<PaginatedResponse<UserResponseModel>> {
  const url = new URL("https://api.github.com/search/users");
  url.searchParams.append("q", q);
  url.searchParams.append("per_page", "100");

  if (page) url.searchParams.append("page", page.toString());

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Something went wrong. Try again in a while.");
  }

  const hasNext = response.headers.get("Link")?.includes('rel="next"') ?? false;
  const data = (await response.json()) satisfies SearchUserResponse;

  return {
    hasNext,
    items: data.items,
  };
}
