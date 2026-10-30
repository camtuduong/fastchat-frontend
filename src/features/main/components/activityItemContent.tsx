import { activityLogTypes } from "@/features/main/constant";
import type { ActivityLogType } from "@/features/main/types/activity";

const STYLE = {
  p: "text-[14px]",
  span: "font-bold",
};
export const transActivityTypeToText = (
  userName?: string,
  type?: ActivityLogType,
) => {
  switch (type) {
    case activityLogTypes.system:
      return "System";
    case activityLogTypes.mention:
      return userName ? (
        <p className={STYLE.p}>
          <span className={STYLE.span}> {userName} </span>mentioned you in a
          message
        </p>
      ) : (
        ""
      );
    case activityLogTypes.reply:
      return userName ? (
        <p className={STYLE.p}>
          <span className={STYLE.span}>{userName}</span> replied to your message
        </p>
      ) : (
        ""
      );
    case activityLogTypes.reaction:
      return userName ? (
        <p className={STYLE.p}>
          <span className={STYLE.span}>{userName}</span> reacted to your message
        </p>
      ) : (
        ""
      );
    case activityLogTypes.newMessage:
      return userName ? (
        <p className={STYLE.p}>
          You got a new message from{" "}
          <span className={STYLE.span}>{userName}</span>
        </p>
      ) : (
        ""
      );
    case activityLogTypes.friendRequestAccepted:
      return userName ? (
        <p className={STYLE.p}>
          Your friend request was accepted by{" "}
          <span className={STYLE.span}>{userName}</span>
        </p>
      ) : (
        ""
      );
    case activityLogTypes.addedToNewConversation:
      return userName ? (
        <p className={STYLE.p}>
          You were added to a new conversation by{" "}
          <span className={STYLE.span}>{userName}</span>
        </p>
      ) : (
        ""
      );
    case activityLogTypes.addedToExistingConversation:
      return userName ? (
        <p className={STYLE.p}>
          You were added to an existing conversation by{" "}
          <span className={STYLE.span}>{userName}</span>
        </p>
      ) : (
        ""
      );
    case activityLogTypes.receivedFriendRequest:
      return userName ? (
        <p className={STYLE.p}>
          You received a friend request from{" "}
          <span className={STYLE.span}>{userName}</span>
        </p>
      ) : (
        ""
      );
  }
  return "";
};
