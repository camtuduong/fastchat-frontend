import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { Participant } from "@/features/chat/types/conversation";

type Props = {
  members: Participant[] | undefined;
};

export const ConversationHeader = ({ members }: Props) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 bg-amber-200">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-6"
        />
        {/* Tên người đang chat */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <Avatar>
                <AvatarFallback>
                  {members
                    ?.map((member) => member.username[0].toUpperCase())
                    .join(", ")}
                </AvatarFallback>
              </Avatar>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">
                {members?.map((member) => member.username).join(", ")}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};
