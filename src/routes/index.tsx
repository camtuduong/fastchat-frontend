import { App } from "@/App";
import SignUpPage from "@/features/auth/pages/SignUpPage";
import { ProfilePage } from "@/features/profile/pages/ProfilePage";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { redirectIfUnauthenticated } from "@/utils/guards";
import { HomePage } from "@/features/home/pages/HomePage";
import { ChatPage } from "@/features/chat/pages/ChatPage";
import { SignInPage } from "@/features/auth/pages/SignInPage";

const rootRoute = createRootRoute({
  component: App,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: redirectIfUnauthenticated,
  component: HomePage,
});

//auth
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "login",
  component: SignInPage,
});

const signInRedirectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "signin",
  beforeLoad: () => {
    throw redirect({ to: "/login" });
  },
  component: () => null,
});

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "signup",
  beforeLoad: () => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      throw redirect({ to: "/" });
    }
  },
  component: SignUpPage,
});

//user profile
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "profile",
  beforeLoad: redirectIfUnauthenticated,
  component: ProfilePage,
});

//chat
const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "chat",
  beforeLoad: redirectIfUnauthenticated,
  component: ChatPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  signInRedirectRoute,
  signUpRoute,
  profileRoute,
  chatRoute,
]);

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
