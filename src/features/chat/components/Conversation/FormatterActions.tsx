import { Separator } from "@/components/ui/separator";
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

const Style = {
  buttonStyle:
    "cursor-pointer items-center hover:bg-accent-foreground/10 rounded-md p-2 transition-colors duration-100 bg-transparent text-muted-foreground hover:text-accent-foreground [&_svg]:size-4",
};

type Props = {
  wrapSelection: (prefix: string, suffix?: string) => void;
};

export const FormatterActions = ({ wrapSelection }: Props) => {
  return (
    <div className="flex gap-1 transition duration-500 ease-in-out">
      <div>
        <button
          type="button"
          className={Style.buttonStyle}
          onClick={() => wrapSelection("**")}
        >
          <Bold />
        </button>
        <button
          type="button"
          className={Style.buttonStyle}
          onClick={() => wrapSelection("*")}
        >
          <Italic />
        </button>
        <button
          type="button"
          className={Style.buttonStyle}
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
          className={Style.buttonStyle}
          onClick={() => wrapSelection("[", "](url)")}
        >
          <Link />
        </button>
        <button
          type="button"
          className={Style.buttonStyle}
          onClick={() => wrapSelection("`")}
        >
          <ChevronsLeftRight />
        </button>
        <button
          type="button"
          className={Style.buttonStyle}
          onClick={() => wrapSelection("> ", "")}
        >
          <Quote />
        </button>
        <button
          type="button"
          className={Style.buttonStyle}
          onClick={() => wrapSelection("- ", "")}
        >
          <List />
        </button>
        <button
          type="button"
          className={Style.buttonStyle}
          onClick={() => wrapSelection("1. ", "")}
        >
          <ListOrdered />
        </button>
      </div>
      <Separator
        orientation="vertical"
        className="data-vertical:self-center data-[orientation=vertical]:h-6"
      />
      <button type="button" className={Style.buttonStyle}>
        <CircleAlert />
      </button>
    </div>
  );
};
