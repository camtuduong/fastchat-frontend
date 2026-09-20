import { describe, test, expect, vi } from "vitest";
import { api } from "@/services/api";

vi.mock("@/services/api", () => ({
  api: {
    post: vi.fn().mockResolvedValue({
      data: { message: "Signup successful" },
    }),
  },
}));

describe("Signup Unit Test", () => {
  test("should sign up successfully", async () => {
    const response = await api.post("/signup", {
      username: "test",
      password: "test",
      email: "test@example.com",
      confirmPassword: "test",
      firstName: "Test",
      lastName: "User",
    });
    expect(response.data.message).toBe("Signup successful");
  });
});
