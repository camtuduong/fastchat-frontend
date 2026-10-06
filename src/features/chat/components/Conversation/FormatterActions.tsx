import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Bold,
  Italic,
  Strikethrough,
  Link,
  ChevronsLeftRight,
  Quote,
  List,
  ListOrdered,
  CircleAlert,
} from "lucide-react";

type Props = {
  showMarkDown: boolean;
  wrapSelection: (prefix: string, suffix?: string) => void;
};
const Style = {
  buttonStyle: (showMarkDown: boolean) =>
    cn(
      "cursor-pointer items-center hover:bg-composer-action-hover rounded-md bg-transparent p-2 text-composer-icon transition-colors duration-100 hover:text-composer-icon-hover [&_svg]:size-4",
      showMarkDown ? "text-composer-icon/50" : "",
    ),
};

export const FormatterActions = ({ wrapSelection, showMarkDown }: Props) => {
  return (
    <div className="flex gap-1 transition duration-500 ease-in-out">
      <div>
        <button
          type="button"
          className={Style.buttonStyle(showMarkDown)}
          onClick={() => wrapSelection("**")}
        >
          <Bold />
        </button>
        <button
          type="button"
          className={Style.buttonStyle(showMarkDown)}
          onClick={() => wrapSelection("*")}
        >
          <Italic />
        </button>
        <button
          type="button"
          className={Style.buttonStyle(showMarkDown)}
          onClick={() => wrapSelection("~~")}
        >
          <Strikethrough />
        </button>
      </div>
      <Separator
        orientation="vertical"
        className="data-vertical:self-center data-[orientation=vertical]:h-6"
      />
      <div>
        <button
          type="button"
          className={Style.buttonStyle(showMarkDown)}
          onClick={() => wrapSelection("[", "](url)")}
        >
          <Link />
        </button>
        <button
          type="button"
          className={Style.buttonStyle(showMarkDown)}
          onClick={() => wrapSelection("`")}
        >
          <ChevronsLeftRight />
        </button>
        <button
          type="button"
          className={Style.buttonStyle(showMarkDown)}
          onClick={() => wrapSelection("> ", "")}
        >
          <Quote />
        </button>
        <button
          type="button"
          className={Style.buttonStyle(showMarkDown)}
          onClick={() => wrapSelection("- ", "")}
        >
          <List />
        </button>
        <button
          type="button"
          className={Style.buttonStyle(showMarkDown)}
          onClick={() => wrapSelection("1. ", "")}
        >
          <ListOrdered />
        </button>
      </div>
      <Separator
        orientation="vertical"
        className="data-vertical:self-center data-[orientation=vertical]:h-6"
      />
      <button type="button" className={Style.buttonStyle(showMarkDown)}>
        <CircleAlert />
      </button>
    </div>
  );
};
