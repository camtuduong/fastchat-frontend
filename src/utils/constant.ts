import type { Participant } from "@/features/chat/types/conversation";
import { TypeListFriendRequestLabel } from "@/features/friends/constant";
import type {
  FriendRequestReceived,
  FriendRequestSent,
  FriendRequestType,
} from "@/features/friends/types/request";
import type { FriendshipStatus } from "@/features/friends/types/user";
import type { SidebarStatusType } from "@/types/store";

const GIF_DEFAULT_QUERY = ""; // Giá trị mặc định cho truy vấn tìm kiếm GIF
const GIF_PICKER_LIMIT = 24; // Số lượng GIF hiển thị trong picker
const GIF_FORMAT_FILTER = "gif"; // Định dạng GIF trong picker
const GIF_CONTENT_FILTER = "high"; // Mức độ lọc nội dung GIF trong picker (high, medium, low)

export {
  GIF_PICKER_LIMIT,
  GIF_FORMAT_FILTER,
  GIF_CONTENT_FILTER,
  GIF_DEFAULT_QUERY,
};

export const removeVietnameseTones = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const DATE_FORMAT = "d MMM, h:mm"; // Định dạng ngày giờ

export { DATE_FORMAT };

export const SIDEBAR_CONTENT_STATUS: Record<string, SidebarStatusType> = {
  DEFAULT: "default",
  PINNED: "pinned",
  MEMBERS: "members",
  SHARED: "shared",
  THREADS: "threads",
  THREAD_DETAIL: "threadDetail",
};

type NamedUser = Pick<Participant, "displayName">;

export const sortedUserName = <T extends NamedUser>(users: T[]) =>
  [...users].sort((a, b) => a.displayName.localeCompare(b.displayName));

export const groupedForFriends = <T extends NamedUser>(users: T[]) =>
  sortedUserName(users).reduce(
    (acc, friend) => {
      const firstLetter = removeVietnameseTones(friend.displayName)
        .charAt(0)
        .toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(friend);
      return acc;
    },
    {} as Record<string, T[]>,
  );

type FriendRequestMap = {
  received: FriendRequestReceived;
  sent: FriendRequestSent;
};

// received -> người gửi (fromUserId), sent -> người nhận (toUserId)
export const getRequestUser = <K extends FriendRequestType>(
  request: FriendRequestMap[K],
  type: K,
) =>
  type === TypeListFriendRequestLabel.sent
    ? (request as FriendRequestSent).toUserId
    : (request as FriendRequestReceived).fromUserId;

export const groupedForRequests = <K extends FriendRequestType>(
  requests: FriendRequestMap[K][],
  type: K,
) =>
  [...requests]
    .sort((a, b) =>
      getRequestUser(a, type).displayName.localeCompare(
        getRequestUser(b, type).displayName,
      ),
    )
    .reduce(
      (acc, request) => {
        const firstLetter = removeVietnameseTones(
          getRequestUser(request, type).displayName,
        )
          .charAt(0)
          .toUpperCase();
        if (!acc[firstLetter]) {
          acc[firstLetter] = [];
        }
        acc[firstLetter].push(request);
        return acc;
      },
      {} as Record<string, FriendRequestMap[K][]>,
    );

export const statusClasses: Record<FriendshipStatus, string> = {
  sent: "bg-gray-500",
  received: "bg-blue-500",
  none: "hidden",
  friend: "bg-green-500",
  pending: "bg-yellow-500",
};

export const statusLabels: Record<FriendshipStatus, string> = {
  sent: "Sent",
  received: "Received",
  none: "None",
  friend: "Friend",
  pending: "Pending",
};
