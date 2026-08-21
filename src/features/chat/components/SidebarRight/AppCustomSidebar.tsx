import { Separator } from "@/components/ui/separator";

import { CustomSidebar } from "@/components/ui/custom-sidebar";

import { useConversationStore } from "@/stores/useConversationStore";
import { useCustomSidebarStore } from "@/stores/useCustomSidebarStore";
import { SIDEBAR_CONTENT_STATUS } from "@/utils/constant";
import { PinnedList } from "@/features/chat/components/SidebarRight/PinnedList";
import { useUnpinMessageInConversation } from "@/features/chat/hooks/useUnpinMessageInConversation";
import { DefaultContent } from "@/features/chat/components/SidebarRight/DefaultContent";
import { ChevronsLeft, X } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { conversationTypeToLabel } from "@/features/chat/constant";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MemberList } from "@/features/chat/components/SidebarRight/MemberList";
import { SharedList } from "@/features/chat/components/SidebarRight/SharedList";
import { useRemoveMemberInConversation } from "@/features/chat/hooks/removeMemberInConversation";
import { UploadAvatar } from "@/features/main/components/UploadAvatar";
import { useUploadGroupAvatar } from "@/features/chat/hooks/useUploadGroupAvatar";
import { GroupName } from "@/features/chat/components/SidebarRight/GroupName";
import { RenameDialog } from "@/features/chat/components/SidebarRight/RenameDialog";
import { useState } from "react";
import { useRenameGroup } from "@/features/chat/hooks/useRenameGroup";
import { useFavoriteConversation } from "@/features/chat/hooks/useFavoriteConversation";
import { useAddNewMembers } from "@/features/chat/hooks/useAddNewMember";
import { useGetAllAttachmentInConversation } from "@/features/chat/hooks/queries/useGetAllAttachmentInConversation";

export function AppCustomSidebar({
  ...props
}: React.ComponentProps<typeof CustomSidebar>) {
  const conversationDataDetail = useConversationStore(
    (state) => state.conversationDataDetail,
  );

  const myUserId = useAuthStore((state) => state.userId);

  const status = useCustomSidebarStore((state) => state.status);
  const setStatus = useCustomSidebarStore((state) => state.setStatus);
  const setOpen = useCustomSidebarStore((state) => state.setOpen);

  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);

  const { mutateAsync: unpinMessage } = useUnpinMessageInConversation();
  const { mutateAsync: removeMember } = useRemoveMemberInConversation();

  const { mutateAsync: uploadAvatar } = useUploadGroupAvatar();

  const { mutateAsync: renameGroup, isPending: isRenaming } = useRenameGroup();

  const { mutateAsync: addNewMembers, isPending: isAddingNewMembers } =
    useAddNewMembers();

  const { mutateAsync: addFavoriteConversation } = useFavoriteConversation();

  const { data: attachments, isLoading: isAttachmentsLoading } =
    useGetAllAttachmentInConversation(conversationDataDetail?._id);

  if (!conversationDataDetail) {
    return null;
  }

  const members = conversationDataDetail?.participants
    .map((participant) => participant)
    .filter((participant) => participant.userId !== myUserId);

  const nameHeader =
    conversationDataDetail?.type === conversationTypeToLabel.direct
      ? members?.[0]?.displayName
      : conversationDataDetail?.group?.name || "No Name";

  //handle
  const handleUnpinMessage = async (messageId: string) => {
    try {
      await unpinMessage({
        conversationId: conversationDataDetail._id,
        messageId,
      });
    } catch (error) {
      console.error("Error unpinning message:", error);
    }
  };

  const handleRemoveMember = async (userId: string) => {
    try {
      await removeMember({
        conversationId: conversationDataDetail._id,
        memberId: userId,
      });
    } catch (error) {
      console.error("Error removing member:", error);
    }
  };

  const handleUploadAvatar = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        await uploadAvatar({
          conversationId: conversationDataDetail._id,
          formData,
        });
      }
    } catch (error) {
      console.error("Error uploading group avatar:", error);
    }
  };

  const handleRenameGroup = async (groupName: string) => {
    try {
      await renameGroup({
        conversationId: conversationDataDetail._id,
        groupName,
      });
      setIsRenameDialogOpen(false);
    } catch (error) {
      console.error("Error renaming group:", error);
    }
  };

  const handleAddNewMembers = async (userIdsSelected: string[]) => {
    if (
      userIdsSelected.length === 0 ||
      isAddingNewMembers ||
      !conversationDataDetail
    ) {
      return;
    }

    await addNewMembers({
      conversationId: conversationDataDetail._id,
      memberIds: userIdsSelected,
    });
  };

  const handleFavoriteConversation = async () => {
    try {
      if (!conversationDataDetail) {
        return;
      }

      await addFavoriteConversation(conversationDataDetail._id);
    } catch (error) {
      console.error("Error adding favorite conversation:", error);
    }
  };

  //ui
  const Header = ({ title, name }: { title: string; name: string }) => {
    return (
      <header className="flex h-16 w-full shrink-0 items-center justify-between gap-2 border-b">
        <div className="flex gap-2 truncate px-4">
          <div className="flex items-center gap-2">
            <div
              className="flex cursor-pointer items-center gap-2 rounded-md p-1"
              onClick={() => setStatus(SIDEBAR_CONTENT_STATUS.DEFAULT)}
            >
              <ChevronsLeft className="h-4 w-4" />
              <div className="font-bold">{title}</div>
            </div>
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-6"
            />
            <div className="text-muted-foreground text-[13px] italic">
              {name}
            </div>
          </div>
        </div>
        {/* Action buttons */}
        <div
          className="hover:bg-accent/5 mr-2 cursor-pointer rounded-md bg-transparent p-1"
          onClick={() => setOpen(false)}
        >
          <X className="h-4 w-4" />
        </div>
      </header>
    );
  };

  const renderAvatar = () => {
    switch (conversationDataDetail?.type) {
      case conversationTypeToLabel.direct:
        return (
          <>
            <div className="flex items-center gap-2">
              <Avatar className="h-14 w-14">
                <AvatarImage
                  src={
                    conversationDataDetail?.participants?.[1]?.avatarUrl || ""
                  }
                />
                <AvatarFallback>
                  {conversationDataDetail?.participants?.[1]?.displayName?.[0].toUpperCase() ||
                    "F"}
                </AvatarFallback>
              </Avatar>
              <div className="text-panel-foreground text-lg font-bold">
                {members?.[0]?.displayName || "No Name"}
              </div>
            </div>
            <div className="text-sm text-gray-500">
              "No description available"
            </div>
          </>
        );
      case conversationTypeToLabel.group:
        return (
          <>
            <div className="flex items-center gap-2">
              <div className="relative h-14 w-14">
                <Avatar className="h-14 w-14">
                  <AvatarImage
                    src={conversationDataDetail?.group?.groupAvatarUrl || ""}
                  />
                  <AvatarFallback>GR</AvatarFallback>
                </Avatar>
                <UploadAvatar handleFileChange={handleUploadAvatar} />
              </div>

              <GroupName
                groupName={
                  conversationDataDetail?.group?.name ||
                  members?.map((member) => member.displayName).join(", ") ||
                  null
                }
                setIsRenameDialogOpen={setIsRenameDialogOpen}
              />
              <RenameDialog
                open={isRenameDialogOpen}
                onOpenChange={setIsRenameDialogOpen}
                onSubmit={handleRenameGroup}
                title="Rename Group"
                isPending={isRenaming}
              />
            </div>
            <div className="text-sm text-gray-500">
              "No description available"
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const renderSidebarContent = () => {
    switch (status) {
      case SIDEBAR_CONTENT_STATUS.DEFAULT:
      default:
        return (
          <DefaultContent
            isFavorite={conversationDataDetail?.isFavorite || false}
            type={conversationDataDetail?.type}
            renderAvatar={renderAvatar}
            nameHeader={nameHeader}
            memberLength={conversationDataDetail?.participants?.length || 0}
            pinnedMessagesLength={
              conversationDataDetail?.pinnedMessages?.length || 0
            }
            attachmentsLength={attachments?.length || 0}
            onAddNewMembers={handleAddNewMembers}
            isPending={isAddingNewMembers}
            onAddFavoriteConversation={handleFavoriteConversation}
            groupAt={conversationDataDetail?.group?.createdAt || ""}
            groupBy={conversationDataDetail?.group?.createdBy || ""}
          />
        );
      case SIDEBAR_CONTENT_STATUS.PINNED:
        return (
          <div className="flex flex-col gap-2">
            <Header title="Pinned List" name={nameHeader} />
            <PinnedList
              pinnedMessages={conversationDataDetail.pinnedMessages || []}
              onUnpinMessage={handleUnpinMessage}
            />
          </div>
        );
      case SIDEBAR_CONTENT_STATUS.MEMBERS:
        return (
          <div className="flex flex-col gap-2">
            <Header title="Members List" name={nameHeader} />
            <MemberList
              ownerId={conversationDataDetail?.group?.createdBy}
              members={conversationDataDetail?.participants || []}
              onRemoveMember={handleRemoveMember}
            />
          </div>
        );
      case SIDEBAR_CONTENT_STATUS.SHARED:
        return (
          <div className="flex h-full flex-col gap-2">
            <Header title="Shared List" name={nameHeader} />
            <SharedList
              attachments={attachments || []}
              isLoading={isAttachmentsLoading}
            />
          </div>
        );
    }
  };

  return (
    <CustomSidebar variant="floating" {...props}>
      {renderSidebarContent()}
    </CustomSidebar>
  );
}
