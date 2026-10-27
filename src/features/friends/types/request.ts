interface FriendRequestReceived {
  _id: string;
  message: string;
  fromUserId: {
    _id: string;
    displayName: string;
    avatarUrl: string;
  };
  createdAt: string;
  updatedAt: string;
}
interface FriendRequestSent {
  _id: string;
  toUserId: {
    _id: string;
    displayName: string;
    avatarUrl: string;
  };
  message: string;
  createdAt: string;
  updatedAt: string;
}

type FriendRequestType = "received" | "sent";

interface FriendRequestResponse {
  received: FriendRequestReceived[];
  sent: FriendRequestSent[];
}

export type {
  FriendRequestReceived,
  FriendRequestSent,
  FriendRequestResponse,
  FriendRequestType,
};
