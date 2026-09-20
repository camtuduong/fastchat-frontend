import { describe, test, expect, vi } from "vitest";
import { publicApi } from "@/services/api";
import { login } from "./login";

vi.mock("@/services/api", () => ({
  publicApi: {
    post: vi.fn(),
  },
}));

describe("Login Unit Test", () => {
  test("should log in successfully", async () => {
    vi.mocked(publicApi.post).mockResolvedValueOnce({
      data: { message: "Login successful", accessToken: "mockToken" },
    } as never);

    const response = await login("test", "password123");

    expect(publicApi.post).toHaveBeenCalledWith("/auth/signin", {
      username: "test",
      password: "password123",
    });
    expect(response.accessToken).toBe("mockToken");
  });

  test("should fail to log in with incorrect credentials", async () => {
    const error = {
      response: { data: { message: "Invalid credentials" } },
    };
    vi.mocked(publicApi.post).mockRejectedValueOnce(error);

    await expect(login("wrong", "wrong")).rejects.toEqual(error);
  });

  test("should fail to log in when the server returns an error", async () => {
    const error = {
      response: { data: { message: "Invalid credentials" } },
    };
    vi.mocked(publicApi.post).mockRejectedValueOnce(error);

    await expect(login("", "wrong")).rejects.toEqual(error);
  });
});
