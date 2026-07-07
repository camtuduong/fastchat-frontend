import { SidebarTrigger } from "@/components/ui/sidebar";

export const EmptyFriendPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <header className="flex h-16 w-full shrink-0 items-center justify-between gap-2 border-b">
        <div className="flex gap-2 px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
          </div>
        </div>
        {/* Action buttons */}
      </header>
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <div className="text-2xl font-bold">No friend selected</div>
        <div className="text-muted-foreground">
          Please select a friend from the sidebar or add a new one.
        </div>
      </div>
    </div>
  );
};
