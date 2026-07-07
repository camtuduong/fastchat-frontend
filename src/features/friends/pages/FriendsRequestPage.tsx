import { SidebarTriggerHeader } from "@/features/friends/components/SidebarTriggerHeader";
import { getLabelAndIconByPath } from "@/features/friends/constant";
import { useGetPath } from "@/features/friends/hooks/useGetPath";
import { Style } from "@/style";

export const FriendsRequestPage = () => {
  const path = useGetPath();
  const { label, icon } = getLabelAndIconByPath(path);
  return (
    <>
      <SidebarTriggerHeader label={label} icon={icon} />
      <div className={Style.dashboardEmptyContainer}>
        <div className="text-2xl font-bold">No friend selected</div>
        <div className="text-muted-foreground">
          Please select a friend from the sidebar or add a new one.
        </div>
      </div>
    </>
  );
};
