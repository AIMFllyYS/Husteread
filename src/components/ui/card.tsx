import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border p-6 transition-all duration-200",
          hover && "hover:shadow-md hover:-translate-y-0.5",
          className
        )}
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
          color: "var(--card-foreground)",
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

const CardHeader = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mb-4", className)} {...props}>
    {children}
  </div>
);

const CardTitle = ({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn("text-lg font-bold", className)}
    style={{ color: "var(--color-primary)" }}
    {...props}
  >
    {children}
  </h3>
);

const CardContent = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("text-sm", className)} {...props}>
    {children}
  </div>
);

export { Card, CardHeader, CardTitle, CardContent };
export type { CardProps };
