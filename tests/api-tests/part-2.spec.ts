import { expect, request } from "@playwright/test";
import { test } from "../fixtures/fixtures";

test.afterAll(async ({}) => {
  console.log(new Date().toString());
});

test("Test POST and GET requests and validate status - @API @API-Part-2", async ({ request }) => {
  const postResponse = await request.post(
    "https://jsonplaceholder.typicode.com/posts"
  );

  expect(postResponse.ok()).toBeTruthy();

  const getResponse = await request.get(
    "https://jsonplaceholder.typicode.com/posts"
  );

  expect(getResponse.ok()).toBeTruthy();
});
