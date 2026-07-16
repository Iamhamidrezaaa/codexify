import { cn } from "@/lib/utils";

type GridProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "main" | "ul";
};

export function Grid({ children, className, as: Tag = "div" }: GridProps) {
  return (
    <Tag
      className={cn(
        "mx-auto grid w-full max-w-[1600px] grid-cols-4 gap-x-4 px-5 md:grid-cols-8 md:gap-x-6 md:px-8 lg:grid-cols-12 lg:gap-x-8 lg:px-12",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
