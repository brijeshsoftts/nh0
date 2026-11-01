import { cloneElement, isValidElement, type ReactNode, useState } from "react";

import { cn } from "@/lib/utils";

interface HoverTextProps {
  text?: string;
  children?: ReactNode;
  className?: string;
  staggerDelay?: number;
  duration?: number;
}

function getTextContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return node.type === "br" ? " " : getTextContent(node.props.children);
  }

  return "";
}

export function HoverText({
  text,
  children,
  className,
  staggerDelay = 35,
  duration = 400,
}: HoverTextProps) {
  const [isHovered, setIsHovered] = useState(false);
  const content = children ?? text ?? "";
  const label = text ?? getTextContent(content);
  let characterIndex = 0;

  const renderAnimatedContent = (node: ReactNode): ReactNode => {
    if (typeof node === "string") {
      return Array.from(node).map((char) => {
        const index = characterIndex++;

        return (
          <span
            key={`${index}-${char}`}
            className={cn(
              "inline-block whitespace-pre transition-all ease-out",
              isHovered
                ? "-translate-y-1 opacity-70"
                : "translate-y-0 opacity-100"
            )}
            style={{
              transitionDuration: `${duration}ms`,
              transitionDelay: isHovered ? `${index * staggerDelay}ms` : "0ms",
            }}
          >
            {char}
          </span>
        );
      });
    }

    if (Array.isArray(node)) {
      return node.map((child, index) => (
        <span key={index}>{renderAnimatedContent(child)}</span>
      ));
    }

    if (
      isValidElement<{ children?: ReactNode }>(node) &&
      node.props.children !== undefined
    ) {
      return cloneElement(
        node,
        undefined,
        renderAnimatedContent(node.props.children)
      );
    }

    return node;
  };

  return (
    <span
      className={cn("inline", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      aria-label={label}
    >
      <span aria-hidden="true" className="inline">
        {renderAnimatedContent(content)}
      </span>
    </span>
  );
}
