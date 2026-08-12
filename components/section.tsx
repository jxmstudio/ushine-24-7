import { cn } from "@/lib/utils";
import { Container } from "@/components/container";

type SectionProps = React.ComponentProps<"section"> & {
  /** Background treatment for the band. */
  tone?: "default" | "muted" | "ink";
  containerClassName?: string;
};

const tones = {
  default: "bg-background",
  muted: "bg-muted/50",
  ink: "bg-ink text-ink-foreground",
} as const;

export function Section({
  className,
  containerClassName,
  tone = "default",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("py-12 sm:py-16 lg:py-24", tones[tone], className)}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className="text-brand-strong text-sm font-semibold tracking-[0.14em] uppercase">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">{title}</h2>
      {description ? (
        <p className="text-muted-foreground text-[0.95rem] leading-relaxed sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
