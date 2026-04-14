import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load and show site title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/HUSTERead/);
    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Health API", () => {
  test("should return ok status", async ({ request }) => {
    const response = await request.get("/api/health");
    expect(response.ok()).toBeTruthy();
    const json = await response.json();
    expect(json.status).toBe("ok");
    expect(json.name).toBe("HUSTERead API");
  });
});

test.describe("Auth API", () => {
  test("send-code should reject invalid email", async ({ request }) => {
    const response = await request.post("/api/auth/send-code", {
      data: { email: "not-an-email" },
    });
    expect(response.status()).toBe(400);
    const json = await response.json();
    expect(json.success).toBe(false);
    expect(json.error.code).toBe("VALIDATION_ERROR");
  });

  test("verify-code should reject empty code", async ({ request }) => {
    const response = await request.post("/api/auth/verify-code", {
      data: { email: "test@test.com", code: "abc" },
    });
    expect(response.status()).toBe(400);
    const json = await response.json();
    expect(json.success).toBe(false);
  });

  test("me should return 401 when not logged in", async ({ request }) => {
    const response = await request.get("/api/auth/me");
    expect(response.status()).toBe(401);
    const json = await response.json();
    expect(json.success).toBe(false);
    expect(json.error.code).toBe("UNAUTHORIZED");
  });
});
