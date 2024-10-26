import type { ReactNode } from "react";
import React, { useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InteractiveTooltipProps {
  children: ReactNode;
  content: ReactNode;
}

export const InteractiveTooltip: React.FC<InteractiveTooltipProps> = ({
  children,
  content,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip open={isOpen}>
        <TooltipTrigger asChild>
          <div
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            style={{ cursor: "pointer", display: "inline-block" }}
          >
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent className="shadow-md bg-yellow-400">{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
