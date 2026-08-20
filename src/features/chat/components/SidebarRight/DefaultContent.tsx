import { CustomSidebarContent } from "@/components/ui/custom-sidebar";
import { Separator } from "@/components/ui/separator";
import { SelectUsersDialog } from "@/features/chat/components/SelectUsersDialog";
import { RightSidebarHeader } from "@/features/chat/components/SidebarRight/RightSidebarHeader";
import { conversationTypeToLabel } from "@/features/chat/constant";
import type { Conversation } from "@/features/chat/types/conversation";
import { cn } from "@/lib/utils";
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
import type { JSX, ReactNode } from "react";
import { Fragment } from "react";
const Style = {
  icon: "text-panel-foreground flex h-4 w-4 items-center justify-center text-sm font-medium transition-all duration-200",
  iconSize: "h-4 w-4",
};

type Props = {
  type: Conversation["type"];
  renderAvatar: () => JSX.Element | null;
  nameHeader: string;
  memberLength: number;
  pinnedMessagesLength: number;
  onAddNewMembers: (userIdsSelected: string[]) => Promise<void>;
  isFavorite: boolean | undefined;
  isPending: boolean;
  onAddFavoriteConversation: () => Promise<void>;
  groupAt: string;
  groupBy: string;
  attachmentsLength: number;
};
export const DefaultContent = ({
  type,
  renderAvatar,
  nameHeader,
  memberLength,
  pinnedMessagesLength,
  onAddNewMembers,
  isPending,
  onAddFavoriteConversation,
  groupAt,
  groupBy,
  isFavorite,
  attachmentsLength,
}: Props) => {
  const setStatus = useCustomSidebarStore((state) => state.setStatus);

  const fastAction: {
    value: string;
    icon: JSX.Element;
    type: string[];
    action?: () => void;
    dialog?: (trigger: ReactNode) => ReactNode;
  }[] = [
    {
      value: isFavorite ? "Unlike" : "Like",
      icon: (
        <Star
          fill={isFavorite ? "#ecc94b" : "none"}
          stroke={isFavorite ? "#ecc94b" : "currentColor"}
          className={cn(Style.iconSize)}
        />
      ),
      type: [conversationTypeToLabel.direct, conversationTypeToLabel.group],
      action: () => {
        onAddFavoriteConversation();
      },
    },
    {
      value: "Notification",
      icon: <BellRing className={Style.iconSize} />,
      type: [conversationTypeToLabel.direct, conversationTypeToLabel.group],
      action: () => {},
    },
    {
      value: "Add",
      icon: <UserPlus className={Style.iconSize} />,
      type: [conversationTypeToLabel.group],
      dialog: (trigger) => (
        <SelectUsersDialog
          title="Add New Members"
          onSubmit={onAddNewMembers}
          isPending={isPending}
          buttonTrigger={trigger}
        />
      ),
    },
    {
      value: "Copy link",
      icon: <Link className={Style.iconSize} />,
      type: [conversationTypeToLabel.group],
      action: () => {},
    },
  ];

  const moreAction: {
    value: string;
    icon: JSX.Element;
    type: string[];
    status: SidebarStatusType;
    length?: number;
    action: (() => void) | undefined;
  }[] = [
    {
      value: "Group Setting",
      icon: <Settings className={Style.iconSize} />,
      type: [conversationTypeToLabel.group],
      status: SIDEBAR_CONTENT_STATUS.SETTINGS,
      action: () => {},
    },
    {
      value: "Notifications Options",
      icon: <Bell className={Style.iconSize} />,
      type: [conversationTypeToLabel.group],
      status: SIDEBAR_CONTENT_STATUS.NOTIFICATIONS,
      action: () => {},
    },
    {
      value: "Members",
      icon: <User className={Style.iconSize} />,
      type: [conversationTypeToLabel.group],
      status: SIDEBAR_CONTENT_STATUS.MEMBERS,
      length: memberLength,
      action: () => {
        setStatus(SIDEBAR_CONTENT_STATUS.MEMBERS);
      },
    },
    {
      value: "Pinned Messages",
      icon: <Pin className={Style.iconSize} />,
      type: [conversationTypeToLabel.direct, conversationTypeToLabel.group],
      status: SIDEBAR_CONTENT_STATUS.PINNED,
      length: pinnedMessagesLength,
      action: () => {},
    },
    {
      value: "Attachments",
      icon: <Paperclip className={Style.iconSize} />,
      type: [conversationTypeToLabel.direct, conversationTypeToLabel.group],
      status: SIDEBAR_CONTENT_STATUS.SHARED,
      length: attachmentsLength,
      action: () => {},
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <RightSidebarHeader name={nameHeader} />
      <CustomSidebarContent>
        <div className="flex flex-1 flex-col gap-2 p-2">
          <div className="flex gap-2">
            {fastAction
              .filter((action) => action.type.includes(type))
              .map((action, index) => {
                const triggerDiv = (
                  <div
                    className="bg-panel-action hover:bg-panel-action-hover flex w-full cursor-pointer flex-col items-center gap-2 rounded-md p-2 transition-all duration-200"
                    onClick={action.action}
                  >
                    <span className={Style.icon}>{action.icon}</span>
                    <span className="text-panel-foreground text-[12px] font-medium">
                      {action.value}
                    </span>
                  </div>
                );
                return (
                  <Fragment key={index}>
                    {action.dialog ? action.dialog(triggerDiv) : triggerDiv}
                  </Fragment>
                );
              })}
          </div>
          <div className="flex flex-col gap-2 p-2">
            <div className="flex flex-col gap-2">
              {renderAvatar()}

              <div className="flex items-center gap-1 text-[13px] text-gray-500">
                Created at :
                <div className="text-[13px] text-gray-500 italic">
                  {format(new Date(groupAt), DATE_FORMAT)}
                </div>
              </div>
              <div className="text-[13px] text-gray-500 italic">{groupBy}</div>
            </div>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="flex flex-col gap-2 p-2">
          {moreAction
            .filter((action) => action.type.includes(type))
            .map((action, index) => (
              <div
                key={index}
                className="hover:bg-panel-row-hover text-panel-foreground flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm transition-all duration-200"
                onClick={() => {
                  setStatus(action.status);
                }}
              >
                {action.icon}
                {action.value}

                {action.length !== undefined && (
                  <div className="text-panel-muted ml-auto text-[12px]">
                    {action.length}
                  </div>
                )}
              </div>
            ))}
        </div>
      </CustomSidebarContent>
    </div>
  );
};
