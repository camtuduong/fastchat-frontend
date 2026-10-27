import { getMe } from "@/features/auth/api/getMe";
import { useGetMe } from "@/features/auth/hooks/queries/useGetMe";
import { useAuthStore } from "@/stores/useAuthStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { expect, it, vi } from "vitest";

vi.mock("@/features/auth/api/getMe", () => ({ getMe: vi.fn() }));

it("does not carry a previous session error into a new login", async () => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  const previousStorage = useAuthStore.persist.getOptions().storage;
  useAuthStore.persist.setOptions({
    storage: {
      getItem: () => null,
      setItem: vi.fn(),
      removeItem: vi.fn(),
    },
  });
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const container = document.createElement("div");
  const root = createRoot(container);
  let currentQuery: ReturnType<typeof useGetMe> | undefined;
  const previousError = new Error("Do not have access token");
  const user = {
    _id: "new-user",
    username: "new-user",
    displayName: "New User",
  };

  function Probe() {
    currentQuery = useGetMe();
    return null;
  }

  vi.mocked(getMe)
    .mockRejectedValueOnce(previousError)
    .mockResolvedValueOnce({ user });
  useAuthStore.setState({ accessToken: "old-token" });

  try {
    await act(async () => {
      root.render(
        createElement(
          QueryClientProvider,
          { client: queryClient },
          createElement(Probe),
        ),
      );
    });
    await vi.waitFor(async () => {
      await act(async () => {});
      expect(currentQuery?.error).toBe(previousError);
    });

    await act(async () => {
      useAuthStore.getState().clearAuth();
    });
    expect(currentQuery?.error).toBeNull();

    await act(async () => {
      useAuthStore.setState({ accessToken: "new-token" });
    });
    expect(currentQuery?.error).toBeNull();

    await vi.waitFor(async () => {
      await act(async () => {});
      expect(currentQuery?.data).toEqual(user);
    });
    expect(useAuthStore.getState().accessToken).toBe("new-token");
    expect(getMe).toHaveBeenCalledTimes(2);
  } finally {
    await act(async () => root.unmount());
    queryClient.clear();
    useAuthStore.getState().clearAuth();
    useAuthStore.persist.setOptions({ storage: previousStorage });
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  }
});
