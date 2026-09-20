import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { api } from "@/services/api";
import { useAuthStore } from "@/stores/useAuthStore";

let root: Root | undefined;

const LogoutHarness = ({ onFinished }: { onFinished: () => void }) => {
	const { mutateAsync } = useLogout();

	const handleLogout = async () => {
		try {
			await mutateAsync();
		} finally {
			onFinished();
		}
	};

	return (
		<button type="button" onClick={() => void handleLogout()}>
			Logout
		</button>
	);
};

describe("logout integration flow", () => {
	beforeEach(() => {
		vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
		useAuthStore.persist.setOptions({
			storage: {
				getItem: () => null,
				setItem: () => undefined,
				removeItem: () => undefined,
			},
		});
	});

	afterEach(() => {
		root?.unmount();
		root = undefined;
		vi.restoreAllMocks();
		useAuthStore.setState({
			accessToken: null,
			userId: null,
			displayName: null,
			isLoading: false,
		});
		vi.unstubAllGlobals();
		document.body.innerHTML = "";
	});

	test("signs out, clears auth state, and removes the current-user cache", async () => {
		const postSpy = vi.spyOn(api, "post").mockResolvedValueOnce({
			data: { message: "Sign out successful" },
		} as never);
		const queryClient = new QueryClient({
			defaultOptions: {
				queries: { retry: false },
				mutations: { retry: false },
			},
		});
		const container = document.createElement("div");
		document.body.append(container);
		root = createRoot(container);
		let resolveFinished: () => void;
		const finished = new Promise<void>((resolve) => {
			resolveFinished = resolve;
		});

		await act(async () => {
			root?.render(
				<QueryClientProvider client={queryClient}>
					<LogoutHarness onFinished={resolveFinished} />
				</QueryClientProvider>,
			);
		});

		useAuthStore.setState({
			accessToken: "access-token",
			userId: "user-1",
			displayName: "Test User",
			isLoading: false,
		});
		queryClient.setQueryData(["me"], { userId: "user-1" });

		const button = document.querySelector("button");
		expect(button).not.toBeNull();

		await act(async () => {
			button?.click();
			await finished;
		});

		expect(postSpy).toHaveBeenCalledWith("/auth/signout");
		expect(useAuthStore.getState()).toMatchObject({
			accessToken: null,
			userId: null,
			displayName: null,
		});
		expect(queryClient.getQueryData(["me"])).toBeUndefined();
	});
});
