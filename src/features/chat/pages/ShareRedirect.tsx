import { useJoinConversationByToken } from "@/features/chat/hooks/queries/useJointConversationByToken";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useEffect } from "react";

export const ShareRedirect = () => {
  const navigate = useNavigate();
  const token = useParams({
    strict: false,
    shouldThrow: false,
  })?.token;

  const { data, isLoading } = useJoinConversationByToken(token ?? "");

  useEffect(() => {
    if (data?.conversationId) {
      navigate({
        to: "/chat/$conversationId",
        params: {
          conversationId: data.conversationId,
        },
      });
    }

    if (!token || (!isLoading && !data?.conversationId)) {
      navigate({ to: "/chat" });
    }
  }, [data]);

  return null;
};
