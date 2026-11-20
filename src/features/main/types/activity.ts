interface ActivityLog {
  _id: string;
  type: ActivityLogType;
  sender: {
    userId: number;
    displayName: string;
    avatarUrl: string;
  };
  isRead: boolean;
  requestId?: string;
  idToLink?: string;
  createdAt: string;
}

type ActivityLogType =
  | "system"
  | "mention"
  | "reply"
  | "reaction"
  | "new_message"
  | "added_to_new_conversation"
  | "received_friend_request"
  | "friend_request_accepted";

type Notification = {
  _id: string;
  ownerId: string;
  unReadCount: number;
};

export type { ActivityLog, ActivityLogType, Notification };
