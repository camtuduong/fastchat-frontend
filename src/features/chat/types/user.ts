interface User {
  avatarUrl: string;
  createdAt: string;
  displayName: string;
  email: string;
  lastActive: boolean;
  status: "online" | "offline";
  updatedAt: string;
  username: string;
  __v: number;
  _id: string;
}

interface UserActivityResponse {
  usersActivity: UserActivity[];
}

interface UserActivity {
  _id: string;
  avatarUrl: string;
  displayName: string;
  status: "online" | "offline";
  username: string;
  lastActiveAt: string;
}
export type { User, UserActivity, UserActivityResponse };
