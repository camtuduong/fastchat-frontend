import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar";

type Props = {
  varian?: "default" | "nav";
  participantsName: string;
};

export const AvatarUser = ({ participantsName }: Props) => {
  return (
    <div>
      <Avatar>
        <AvatarFallback>{participantsName[0].toUpperCase()}</AvatarFallback>
        <AvatarBadge className="bg-green-600 dark:bg-green-800" />
      </Avatar>
      <div className="truncate">
        <div className="truncate">{participantsName}</div>
        <div className="text-muted-foreground text-xs">Last message</div>
      </div>
    </div>
  );
};
