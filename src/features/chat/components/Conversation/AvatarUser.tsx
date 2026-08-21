import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";

type Props = {
  varian?: "default" | "nav";
  participantsName: string;
};

export const AvatarUser = ({ participantsName }: Props) => {
  const { t } = useTranslation();
  return (
    <div>
      <Avatar>
        <AvatarFallback>{participantsName?.[0]?.toUpperCase()}</AvatarFallback>
        <AvatarBadge className="bg-status-online" />
      </Avatar>
      <div className="truncate">
        <div className="truncate">{participantsName}</div>
        <div className="text-muted-foreground text-xs">
          {t("chat.lastMessage")}
        </div>
      </div>
    </div>
  );
};
