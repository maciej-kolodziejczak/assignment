import nock from "nock";
import { afterEach, describe, test, expect } from "vitest";
import { createFetcher, githubFetcher, searchUser } from "./api";

afterEach(() => {
  nock.cleanAll();
});

describe("createFetcher", () => {
  test("creates a fetcher function with the correct base URL and headers", async () => {
    const scope = nock("https://api.example.com", {
      reqheaders: {
        authorization: "Bearer token",
        "custom-header": "value",
      },
    })
      .get("/endpoint")
      .reply(200, {});

    await createFetcher("https://api.example.com", {
      Authorization: "Bearer token",
    })("/endpoint", {
      headers: {
        "Custom-Header": "value",
      },
    });

    scope.done();
  });
});

describe("githubFetcher", () => {
  test("creates a fetcher function with the correct base URL and headers", async () => {
    const scope = nock("https://api.github.com", {
      reqheaders: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })
      .get("/")
      .reply(200, {});

    await githubFetcher("/");

    scope.done();
  });
});

describe("searchUser", () => {
  test("uses correct parameters", async () => {
    const scope = nock("https://api.github.com")
      .get("/search/users?q=test&per_page=100")
      .reply(200, { items: [] });

    await searchUser("test");

    scope.done();

    scope
      .get("/search/users?q=test&page=2&per_page=100")
      .reply(200, { items: [] });

    await searchUser("test", 2);

    scope.done();
  });

  test("unwraps the response and extracts pagination info", async () => {
    const scope = nock("https://api.github.com")
      .get("/search/users?q=test&per_page=100")
      .reply(
        200,
        { items: [] },
        {
          Link: '<https://api.github.com/search/users?q=test&page=2>; rel="next"',
        }
      );

    const response = await searchUser("test");
    expect(response).toMatchObject({ data: { items: [] }, hasNext: true });
    scope.done();
  });
});
