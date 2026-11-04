import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

type Props = {
  requestId: string;
  handleAcceptFriendRequest: (id: string) => void;
  handleRejectFriendRequest: () => void;
  isAccepting: boolean;
  isDeclining: boolean;

  className?: string;
  styleButtonDecline?: string;
};
export const ReceivedActionButton = ({
  requestId,
  handleAcceptFriendRequest,
  handleRejectFriendRequest,
  isAccepting,
  isDeclining,
  className,
  styleButtonDecline,
}: Props) => {
  const { t } = useTranslation();
  return (
    <div className={cn("mr-2 flex gap-2", className)}>
      <Button
        className="bg-button-success hover:bg-button-success-hover text-white"
        onClick={() => handleAcceptFriendRequest(requestId)}
        disabled={isAccepting || isDeclining}
      >
        {t("friends.requests.accept")}
      </Button>
      <Button
        onClick={handleRejectFriendRequest}
        variant="outline"
        className={cn(styleButtonDecline)}
        disabled={isAccepting || isDeclining}
      >
        {t("friends.requests.decline")}
      </Button>
    </div>
  );
};
