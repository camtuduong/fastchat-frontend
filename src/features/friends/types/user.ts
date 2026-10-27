interface SuggestUsers {
  _id: string;
  displayName: string;
  email: string;
  avatarUrl?: string;
  suggestion_reason: SuggestionReason;
  friendship_status: FriendshipStatus;
}

type FriendshipStatus = "sent" | "received" | "none" | "friend" | "pending";
type SuggestionReason = "mutual_friends" | "contacts" | "same_group" | "none";

interface SuggestUsersResult {
  users: SuggestUsers[];
}

export type {
  SuggestUsers,
  SuggestUsersResult,
  SuggestionReason,
  FriendshipStatus,
};
