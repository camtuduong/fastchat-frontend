export const EmptyChatPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="text-2xl font-bold">No conversation selected</div>
      <div className="text-muted-foreground">
        Please select a conversation from the sidebar or start a new one.
      </div>
    </div>
  );
};
