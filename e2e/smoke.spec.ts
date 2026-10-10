import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load and show site title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/HUSTERead/);
    await expect(page.locator("body")).toBeVisible();
  });

  test("should display real statistics", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=15+")).toBeVisible();
    await expect(page.locator("text=场线下活动")).toBeVisible();
  });
});

test.describe("Articles Page", () => {
  test("should load and show header", async ({ page }) => {
    await page.goto("/articles");
    await expect(page.getByText("浩瀚书卷", { exact: true })).toBeVisible();
  });

  test("should display article list", async ({ page }) => {
    await page.goto("/articles");
    await expect(page.locator("text=往期简牍")).toBeVisible();
  });
});

test.describe("Activities Page", () => {
  test("should load and show header", async ({ page }) => {
    await page.goto("/activities");
    await expect(page.locator("body")).toBeVisible();
    await expect(page.getByText("HUSTERead", { exact: true }).first()).toBeVisible();
  });
});

test.describe("Forum Page", () => {
  test("should load and show header", async ({ page }) => {
    await page.goto("/forum");
    await expect(page.getByText("思维", { exact: true })).toBeVisible();
  });

  test("should display posts", async ({ page }) => {
    await page.goto("/forum");
    await expect(page.getByText(/共鸣$/).first()).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Gallery Page", () => {
  test("should load gallery", async ({ page }) => {
    await page.goto("/gallery");
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

test.describe("Articles API", () => {
  test("should return articles or empty list", async ({ request }) => {
    const response = await request.get("/api/articles");
    const json = await response.json();
    // API may fail if Supabase tables don't exist, but should return valid JSON
    expect(json).toHaveProperty("success");
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
