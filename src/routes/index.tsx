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
import { EmptyChatPage } from "@/features/chat/pages/EmptyChatPage";
import { ConversationPage } from "@/features/chat/pages/ConversationPage";

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

const chatIndexRoute = createRoute({
  getParentRoute: () => chatRoute,
  path: "/",
  // loader: async () => {
  //   const data = await getAllConversations("");
  //   const first = data.conversations?.[0];

  //   if (first) {
  //     throw redirect({
  //       to: "/chat/$conversationId",
  //       params: { conversationId: first._id },
  //     });
  //   }

  //   return { conversations: [] };
  // },
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
  profileRoute,
  chatRoute,
  chatIndexRoute,
  chatConversationRoute,
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
