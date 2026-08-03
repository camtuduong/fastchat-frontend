import { CustomSidebarContent } from "@/components/ui/custom-sidebar";
import { Separator } from "@/components/ui/separator";
import { RightSidebarHeader } from "@/features/chat/components/SidebarRight/RightSidebarHeader";
import { conversationTypeToLabel } from "@/features/chat/constant";
import type { Conversation } from "@/features/chat/types/conversation";
import { useCustomSidebarStore } from "@/stores/useCustomSidebarStore";
import type { SidebarStatusType } from "@/types/store";
import { DATE_FORMAT, SIDEBAR_CONTENT_STATUS } from "@/utils/constant";
import { format } from "date-fns";
import {
  Star,
  UserPlus,
  Link,
  Settings,
  Bell,
  BellRing,
  User,
  Pin,
  Paperclip,
} from "lucide-react";
import type { JSX } from "react/jsx-runtime";

const Style = {
  icon: "flex h-4 w-4 items-center justify-center text-sm font-medium text-gray-700 transition-all duration-200 dark:text-gray-300",
  iconSize: "h-4 w-4",
};

const fastAction = [
  {
    value: "Like",
    icon: <Star className={Style.iconSize} />,
    type: [conversationTypeToLabel.direct, conversationTypeToLabel.group],
  },
  {
    value: "Notification",
    icon: <BellRing className={Style.iconSize} />,
    type: [conversationTypeToLabel.direct, conversationTypeToLabel.group],
  },
  {
    value: "Add",
    icon: <UserPlus className={Style.iconSize} />,
    type: [conversationTypeToLabel.group],
  },
  {
    value: "Copy link",
    icon: <Link className={Style.iconSize} />,
    type: [conversationTypeToLabel.group],
  },
];

const moreAction: {
  value: string;
  icon: JSX.Element;
  type: string[];
  status: SidebarStatusType;
}[] = [
  {
    value: "Group Setting",
    icon: <Settings className={Style.iconSize} />,
    type: [conversationTypeToLabel.group],
    status: SIDEBAR_CONTENT_STATUS.SETTINGS,
  },
  {
    value: "Notifications Options",
    icon: <Bell className={Style.iconSize} />,
    type: [conversationTypeToLabel.group],
    status: SIDEBAR_CONTENT_STATUS.NOTIFICATIONS,
  },
  {
    value: "Members",
    icon: <User className={Style.iconSize} />,
    type: [conversationTypeToLabel.group],
    status: SIDEBAR_CONTENT_STATUS.MEMBERS,
  },
  {
    value: "Pinned Messages",
    icon: <Pin className={Style.iconSize} />,
    type: [conversationTypeToLabel.direct, conversationTypeToLabel.group],
    status: SIDEBAR_CONTENT_STATUS.PINNED,
  },
  {
    value: "Attachments",
    icon: <Paperclip className={Style.iconSize} />,
    type: [conversationTypeToLabel.direct, conversationTypeToLabel.group],
    status: SIDEBAR_CONTENT_STATUS.SHARED,
  },
];

type Props = {
  type: Conversation["type"];
  renderAvatar: (conversationDataDetail: Conversation) => JSX.Element | null;
  conversationDataDetail: Conversation;
  nameHeader: string;
};
export const DefaultContent = ({
  type,
  renderAvatar,
  conversationDataDetail,
  nameHeader,
}: Props) => {
  const setStatus = useCustomSidebarStore((state) => state.setStatus);

  return (
    <div className="flex flex-col gap-2">
      <RightSidebarHeader name={nameHeader} />
      <CustomSidebarContent>
        <div className="flex flex-1 flex-col gap-2 p-2">
          <div className="flex gap-2">
            {fastAction
              .filter((action) => action.type.includes(type))
              .map((action, index) => (
                <div
                  key={index}
                  className="bg-accent/5 hover:bg-accent/10 dark:bg-accent dark:hover:bg-accent/10 flex w-full cursor-pointer flex-col items-center gap-2 rounded-md p-2 transition-all duration-200"
                >
                  <span className={Style.icon}>{action.icon}</span>
                  <span className="text-[12px] font-medium text-gray-700 dark:text-gray-300">
                    {action.value}
                  </span>
                </div>
              ))}
          </div>
          <div className="flex flex-col gap-2 p-2">
            <div className="flex flex-col gap-2">
              {renderAvatar(conversationDataDetail)}

              <div className="flex items-center gap-1 text-[13px] text-gray-500">
                Created at :
                <div className="text-[13px] text-gray-500 italic">
                  {format(
                    new Date(conversationDataDetail?.group?.createdAt || ""),
                    DATE_FORMAT,
                  )}
                </div>
              </div>
              <div className="text-[13px] text-gray-500 italic">
                {conversationDataDetail?.group?.createdBy}
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="flex flex-col gap-2 p-2">
          {moreAction
            .filter((action) =>
              action.type.includes(conversationDataDetail?.type),
            )
            .map((action, index) => (
              <div
                key={index}
                className="hover:bg-accent/10 dark:hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm text-gray-700 transition-all duration-200 dark:text-gray-300"
                onClick={() => {
                  setStatus(action.status);
                }}
              >
                {action.icon}
                {action.value}
              </div>
            ))}
        </div>
      </CustomSidebarContent>
    </div>
  );
};
