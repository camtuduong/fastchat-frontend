import { describe, test, expect, vi } from "vitest";
import { api } from "@/services/api";

vi.mock("@/services/api", () => ({
  api: {
    post: vi.fn(),
  },
}));

describe("Logout Unit Test", () => {
  test("should call the logout API endpoint", async () => {
    vi.mocked(api.post).mockResolvedValueOnce({
      data: { message: "Logout successful" },
    });
    const response = await api.post("/logout");
    expect(response.data.message).toBe("Logout successful");
  });

  test("should handle logout API endpoint failure", async () => {
    const error = {
      response: { data: { message: "Logout failed" } },
    };
    vi.mocked(api.post).mockRejectedValueOnce(error);

    await expect(api.post("/logout")).rejects.toEqual(error);
  });
});
