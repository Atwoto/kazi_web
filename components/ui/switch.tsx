"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked, defaultChecked, onCheckedChange, disabled, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(defaultChecked || false);
    const combinedChecked = checked !== undefined ? checked : isChecked;

    const handleClick = () => {
      if (disabled) return;
      const newChecked = !combinedChecked;
      setIsChecked(newChecked);
      onCheckedChange?.(newChecked);
    };

    return (
      <button
        type="button"
        role="switch"
        aria-checked={combinedChecked}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          combinedChecked ? "bg-blue-600" : "bg-slate-200",
          className
        )}
        ref={ref}
        {...props}
      >
        <div
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
            combinedChecked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    );
  }
);
Switch.displayName = "Switch";

export { Switch };
