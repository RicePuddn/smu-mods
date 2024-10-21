import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import React, { type ReactNode, useState } from 'react';

interface InteractiveTooltipProps {
  children: ReactNode;
  content: ReactNode;
}

export const InteractiveTooltip: React.FC<InteractiveTooltipProps> = ({ children, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip open={isOpen}>
        <TooltipTrigger asChild>
          <div
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            style={{ cursor: 'pointer', display: 'inline-block' }}
          >
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-slate-50 shadow-md">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};


