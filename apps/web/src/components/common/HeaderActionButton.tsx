import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";

type HeaderActionButtonProps = Omit<
  ComponentProps<typeof Button>,
  "className" | "size"
>;

export function HeaderActionButton(props: HeaderActionButtonProps) {
  return <Button size="lg" className="h-10 gap-2" {...props} />;
}
