import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

type Props = {
  title: string;
  description: string;
  count?: string;
  searchValue: string;
  setSearchValue: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export const TitleAndSearch = ({
  title,
  description,
  count,
  searchValue,
  setSearchValue,
  placeholder,
  className,
}: Props) => {
  return (
    <div className={cn("mb-5 flex flex-col gap-5", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground text-[16px]">{description}</p>
        </div>
        {count && (
          <span className="text-muted-foreground text-xs">{count}</span>
        )}
      </div>
      <div className="relative w-full">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          autoComplete="one-time-code"
          className="bg-search-bg! border-search-border text-foreground placeholder:text-muted-foreground focus:border-search-focus-border pl-9 placeholder:text-xs"
          id="friends-list-search-input"
          placeholder={placeholder}
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
    </div>
  );
};
