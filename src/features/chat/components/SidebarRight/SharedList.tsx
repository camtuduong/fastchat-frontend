import { Spinner } from "@/components/ui/spinner";
import { typeMessageAttachmentTypeToLabel } from "@/features/chat/constant";
import type { Attachment } from "@/features/chat/types/conversation";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  attachments: Attachment[];
  isLoading: boolean;
};

const STYLE = {
  button:
    "relative border-button-x border text-button-x py-1 px-2 rounded-xl text-sm font-medium  hover:bg-button-x/10 hover:text-button-x cursor-pointer transition-all duration-200",
};

function NoItemsFound() {
  const { t } = useTranslation();
  return (
    <div className="flex h-full items-center justify-center text-gray-500">
      {t("common.noItems")}
    </div>
  );
}

export const SharedList = ({ attachments, isLoading }: Props) => {
  const { t } = useTranslation();
  const buttons = [
    {
      title: t("sidebar.images"),
      type: typeMessageAttachmentTypeToLabel.image,
    },
    { title: t("sidebar.files"), type: typeMessageAttachmentTypeToLabel.file },
  ];
  const [type, setType] = useState<
    | typeof typeMessageAttachmentTypeToLabel.image
    | typeof typeMessageAttachmentTypeToLabel.file
  >(typeMessageAttachmentTypeToLabel.image);

  const countAttachmentsByType = useMemo(
    () => (type: string) => {
      return attachments.filter((attachment) => attachment.type === type)
        .length;
    },
    [attachments],
  );

  const renderBodyAttachment = () => {
    switch (type) {
      case typeMessageAttachmentTypeToLabel.image:
        return (
          <div className="grid aspect-square grid-cols-2 gap-1">
            {attachments.filter(
              (attachment) =>
                attachment.type === typeMessageAttachmentTypeToLabel.image,
            ).length === 0 && <NoItemsFound />}
            {attachments
              .filter(
                (attachment) =>
                  attachment.type === typeMessageAttachmentTypeToLabel.image,
              )
              .map((attachment) => (
                <img
                  key={attachment.url}
                  src={attachment.url}
                  className="h-full w-full cursor-pointer rounded-md object-cover transition-all duration-200 hover:border-2"
                />
              ))}
          </div>
        );
      case typeMessageAttachmentTypeToLabel.file:
        return (
          <div className="flex flex-col gap-2">
            {attachments.filter(
              (attachment) =>
                attachment.type === typeMessageAttachmentTypeToLabel.file,
            ).length === 0 && <NoItemsFound />}
            {attachments
              .filter(
                (attachment) =>
                  attachment.type === typeMessageAttachmentTypeToLabel.file,
              )
              .map((attachment) => (
                <div className="flex flex-col gap-2" key={attachment.url}>
                  <a
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* {attachment.name} */}
                  </a>
                </div>
              ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-2">
      {isLoading ? (
        <div className="flex w-full items-center justify-center py-2">
          <Spinner className="size-4" />
          <span className="ml-2">{t("common.loadingAttachments")}</span>
        </div>
      ) : attachments.length === 0 ? (
        <NoItemsFound />
      ) : (
        <div className="flex h-full flex-col gap-2">
          <div className="flex shrink-0 gap-2">
            {buttons.map((button) => (
              <button
                key={button.type}
                className={cn(
                  STYLE.button,
                  type === button.type && "bg-button-x text-button-x-text",
                )}
                onClick={() => setType(button.type)}
              >
                {button.title}

                <div className="bg-status-unread absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full p-1 text-[12px] text-white">
                  {countAttachmentsByType(button.type)}
                </div>
              </button>
            ))}
          </div>
          <div className="h-full flex-1 overflow-y-auto">
            {renderBodyAttachment()}
          </div>
        </div>
      )}
    </div>
  );
};
