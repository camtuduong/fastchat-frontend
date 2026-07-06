import { App } from "@/App";
import SignUpPage from "@/features/auth/pages/SignUpPage";
import { FriendsPage } from "@/features/friends/pages/FriendsPage";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { redirectIfUnauthenticated } from "@/utils/guards";
import { ChatPage } from "@/features/chat/pages/ChatPage";
import { SignInPage } from "@/features/auth/pages/SignInPage";
import { EmptyChatPage } from "@/features/chat/pages/EmptyChatPage";
import { EmptyFriendPage } from "@/features/friends/pages/EmptyFriend";
import { ConversationPage } from "@/features/chat/pages/ConversationPage";

export const rootRoute = createRootRoute({
  component: App,
});

const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app-layout",
  beforeLoad: redirectIfUnauthenticated,
  component: () => <Outlet />,
});

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      throw redirect({ to: "/chat" });
    } else {
      throw redirect({ to: "/login" });
    }
  },
  component: () => null,
});

//auth
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "login",
  beforeLoad: () => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      throw redirect({ to: "/" });
    }
  },
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

//friends
const friendsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "friends",
  beforeLoad: redirectIfUnauthenticated,
  component: FriendsPage,
});

const friendIndexRoute = createRoute({
  getParentRoute: () => friendsRoute,
  path: "/",
  component: EmptyFriendPage,
});

//chat
const chatRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "chat",
  beforeLoad: redirectIfUnauthenticated,
  component: ChatPage,
});

const chatIndexRoute = createRoute({
  getParentRoute: () => chatRoute,
  path: "/",
  component: EmptyChatPage,
});

export const chatConversationRoute = createRoute({
  getParentRoute: () => chatRoute,
  path: "$conversationId",
  component: ConversationPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  signInRedirectRoute,
  signUpRoute,
  appLayoutRoute.addChildren([
    chatRoute.addChildren([chatIndexRoute, chatConversationRoute]),
    friendsRoute.addChildren([friendIndexRoute]),
  ]),
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
