import type { ActivityLogType } from "@/features/main/types/activity";
import type { LucideIcon } from "lucide-react";
import {
  AtSign,
  CornerUpLeft,
  MessageCircle,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";

const activityLogTypes: Record<string, ActivityLogType> = {
  system: "system",
  newMessage: "new_message",
  mention: "mention",
  reply: "reply",
  reaction: "reaction",
  addedToNewConversation: "added_to_new_conversation",
  receivedFriendRequest: "received_friend_request",
  friendRequestAccepted: "friend_request_accepted",
};

const activityLogTypesLabel: Record<ActivityLogType, string> = {
  system: "System",
  new_message: "New Message",
  mention: "Mention",
  reply: "Reply",
  reaction: "Reaction",
  added_to_new_conversation: "Added to New Conversation",
  received_friend_request: "Received Friend Request",
  friend_request_accepted: "Friend Request Accepted",
};

export const actionTypeIcons: Record<ActivityLogType, LucideIcon | null> = {
  system: null,
  new_message: MessageCircle,
  mention: AtSign,
  reply: CornerUpLeft,
  reaction: MessageCircle,
  added_to_new_conversation: Users,
  received_friend_request: UserPlus,
  friend_request_accepted: UserCheck,
};

export { activityLogTypesLabel, activityLogTypes };
