import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type Props = {
  label: string;
  children: ReactNode;
  className?: string;
  
};

export const SidebarChildLayout = ({ label, children, className }: Props) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu className={cn(className)}>{children}</SidebarMenu>
    </SidebarGroup>
  );
};
