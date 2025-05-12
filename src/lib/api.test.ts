import { afterEach, describe, expect, test, vi } from "vitest";
import { searchUser } from "./api";

describe("api", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("searchUser uses correct parameters", async () => {
    globalThis.fetch = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ items: [] })));

    const response = await searchUser("test");

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("https://api.github.com/search/users?q=test")
    );
    expect(response).toEqual({ items: [], hasNext: false });
  });

  test('searchUser extracts pagination info', async () => {
    globalThis.fetch = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ items: [], total_count: 100 }), {
          headers: { Link: '<https://api.github.com/search/users?q=test&page=2>; rel="next"' },
        })
      );

    const response = await searchUser("test");

    expect(response).toEqual({ items: [], hasNext: true });
  });

  test('searchUser throws errors regardless of status', async () => {
    globalThis.fetch = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ message: "Error" }), { status: 400 }));

    await expect(searchUser("test")).rejects.toThrow();
  })
});
