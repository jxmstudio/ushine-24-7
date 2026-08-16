import { cn } from "@/lib/utils";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

type SectionProps = React.ComponentProps<"section"> & {
  /** Background treatment for the band. */
  tone?: "default" | "paper" | "teal" | "ink";
  containerClassName?: string;
};

const tones = {
  default: "bg-mist",
  paper: "bg-white",
  teal: "bg-teal-glow text-mist",
  ink: "bg-ink text-ink-foreground",
} as const;

/**
 * Standard band. The vertical rhythm comes from the `--spacing-section` tokens
 * (96px mobile / 160px desktop) rather than per-section guesses — cramped
 * spacing is the single loudest "business template" signal, and the previous
 * build ran at 48px.
 */
export function Section({
  className,
  containerClassName,
  tone = "default",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("py-section lg:py-section-lg", tones[tone], className)}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/**
 * Section heading. Left-aligned by default: centred headline over centred
 * sub-line over a row of cards is the exact pattern the client rejected, and
 * the alignment is half of what makes it read that way.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  /** `dark` inverts the colours for use on the teal and ink bands. */
  tone?: "light" | "dark";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col items-start gap-4",
        align === "center" && "mx-auto max-w-3xl items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.18em] uppercase",
            tone === "dark" ? "text-lime" : "text-aqua-ink",
          )}
        >
          <span
            className={cn(
              "h-px w-8",
              tone === "dark" ? "bg-lime" : "bg-aqua-ink",
            )}
          />
          {eyebrow}
        </span>
      ) : null}

      <h2
        className={cn(
          "text-display-sm font-extrabold",
          tone === "dark" ? "text-mist" : "text-foreground",
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-mist/75" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}

      {children}
    </Reveal>
  );
}
