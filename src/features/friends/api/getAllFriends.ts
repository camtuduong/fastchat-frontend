import { api } from "@/services/api";

type FriendApiUser = {
  _id: string;
  displayName: string;
  avatarUrl?: string;
};

interface FriendResponse {
  friends: FriendApiUser[];
}

export const getAllFriends = async (params: string) => {
  const response = await api.get<FriendResponse>(
    `/friends/my-friends?search=${params}`,
  );

  return {
    ...response.data,
    friends: response.data.friends.map(({ _id, displayName, avatarUrl }) => ({
      userId: _id,
      displayName,
      avatarUrl,
    })),
  };
};
