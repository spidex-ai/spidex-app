import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-neutral-300",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-100 text-black hover:bg-neutral-200 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700",
        brand:
          "bg-brand-600 dark:bg-brand-600 text-neutral-50 hover:bg-brand-600/90 dark:hover:bg-brand-600/90",
        destructive:
          "bg-red-500 text-neutral-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90",
        destructiveOutline:
          "border border-red-500 hover:bg-red-500/10 text-red-500 dark:border-red-900 dark:hover:bg-red-900/50",
        destructiveGhost:
          "hover:bg-red-500/10 text-red-500 dark:hover:bg-red-900/50",
        warning:
          "bg-yellow-500 text-neutral-50 hover:bg-yellow-500/90 dark:bg-yellow-900 dark:text-neutral-50 dark:hover:bg-yellow-900/90",
        warningOutline:
          "border border-yellow-500 hover:bg-yellow-500/10 text-yellow-500 dark:border-yellow-900 dark:hover:bg-yellow-900/50",
        warningGhost:
          "hover:bg-yellow-500/10 text-yellow-500 dark:hover:bg-yellow-900/50",
        outline:
          "border border-neutral-200 hover:bg-neutral-200/50 hover:text-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-700/50 dark:hover:text-neutral-50",
        secondary:
          "bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80",
        ghost:
          "hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 text-black dark:text-white",
        brandGhost:
          "hover:bg-brand-500/10 text-brand-500 dark:hover:bg-brand-900/50 text-brand-500",
        link: "text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50",
        brandOutline:
          "border border-brand-600 hover:bg-brand-600/10 text-brand-600 dark:border-brand-600 dark:hover:bg-brand-600/10",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

const GradientBorderButton = (props: any) => {
  const { isLoading, children, className, ...rest } = props;
  return (
    <button
      {...rest}
      disabled={isLoading}
      className={
        cn(
          "gradient-border cursor-pointer",
          className
        )
      }
    >
      {children}
    </button>
  );
};

export const GradientButton = (props: any) => {
  const { isLoading, children,disabled, className, ...rest } = props;
  return (
    <button
      {...rest}
      disabled={isLoading || disabled}
      className={cn(
        "bg-gradient-to-r from-[#009EFF] to-[#BBF985] text-black px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold transition-all duration-200 cursor-pointer",
        "hover:opacity-70",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "inline-flex items-center justify-center gap-2",
        className
      )}
    >
       {isLoading && (
        <div className="w-3 h-3 border-2 pb-2 border-black border-t-transparent rounded-full animate-spin" />
      )}
     {children}
    </button>
  );
};

export const GradientButtonIcon = (props: any) => {
  const { isLoading, children, ...rest } = props;
  return (
    <button
      {...rest}
      disabled={isLoading}
      className="bg-gradient-to-r from-[#009EFF] to-[#BBF985] text-black px-2 md:px-2 py-2 md:py-2 rounded-lg font-semibold hover:opacity-90 transition-all duration-200 cursor-pointer"
    >
      {children}
    </button>
  );
};

export const AgentButton = (props: any) => {
  const { isLoading, children, className, ...rest } = props;
  return (
    <Button
      disabled={isLoading}
      className={cn(
        "flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 h-fit justify-start",
        className
      )}
      variant="outline"
      {...rest}
    >
      {children}
    </Button>
  );
};

export const GradientSecondaryBtn = (props: any) => {
  const { children, className, disabled, ...rest } = props;
  return (
    <button {...rest} disabled={disabled} className={cn(
      "bg-[linear-gradient(90deg,#000000_33%,#009EFF_66%,#BBF985)] mt-0 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 border-2 border-[#BBF985] bg-clip-border [background:linear-gradient(90deg,#000000_33%,#009EFF_66%,#BBF985)_padding-box]",
      disabled && "opacity-50 cursor-not-allowed",
      className
    )}>
      {children}
    </button>
  );
};

export const ButtonBlack = (props: any) => {
  const { children, className, isLoading, disabled, ...rest } = props;
  console.log("🚀 ~ ButtonBlack ~ disabled:", disabled, isLoading)
  return (
    <button
    {...rest}
    disabled={disabled || isLoading}
    className={
      cn(
        "gradient-border-main cursor-pointer text-white bg-bg-tab flex items-center justify-center gap-1",
        "hover:shadow-[0_0_10px_#009EFF] transition-shadow duration-300",
        (disabled || isLoading) && "opacity-50 cursor-not-allowed",
        className
      )
    }
  >
    {isLoading && (
      <div className="w-3 h-3 border-2 pb-2 border-white border-t-transparent rounded-full animate-spin mb-1" />
    )}
    {children}
  </button>
  );
};
export { Button, buttonVariants, GradientBorderButton };
