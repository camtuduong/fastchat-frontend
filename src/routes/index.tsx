import { App } from "@/App";
import SignUpPage from "@/pages/Auth/SignUpPage";
import { ProfilePage } from "@/pages/Profile/ProfilePage";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { redirectIfUnauthenticated } from "@/utils/guards";
import { HomePage } from "@/pages/Home/HomePage";
import { ChatPage } from "@/pages/Chat/ChatPage";
import { SignInPage } from "@/pages/Auth/SignInPage";

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
