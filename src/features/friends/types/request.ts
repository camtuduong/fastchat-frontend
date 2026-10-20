interface FriendRequest {
  _id: string;
  fromUserId: {
    _id: string;
    displayName: string;
    avatarUrl: string;
  };
}
interface FriendRequestResponse {
  requests: FriendRequest[];
}

export type { FriendRequest, FriendRequestResponse };
