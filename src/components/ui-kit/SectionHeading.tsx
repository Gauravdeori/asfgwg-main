import { motion } from "framer-motion";
import FlipText from "../FlipText";

type Props = {
  index: string;
  title: string;
  subtitle?: string;
  status?: string;
  className?: string;
};

/**
 * Indexed section header: mono index, a rule running to a status readout,
 * then the display title. Each line of the title flips up letter-by-letter.
 */
export default function SectionHeading({
  index,
  title,
  subtitle,
  status = "● ACTIVE",
  className = "mb-16 md:mb-24",
}: Props) {
  const lines = title.split("\n");

  return (
    <div className={className}>
      <div className="mb-5 flex items-center gap-4">
        <span className="label-mono">{index}</span>
        <motion.span
          className="h-px flex-1 origin-left bg-border"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
        <span className="label-mono">{status}</span>
      </div>

      <h2 className="display-xl text-5xl text-foreground sm:text-6xl md:text-8xl">
        <span className="sr-only">{title.replace("\n", " ")}</span>
        {lines.map((line, i) => (
          <span key={i} className="block" aria-hidden="true">
            <FlipText text={line} delay={i * 0.12} />
          </span>
        ))}
      </h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-5 max-w-xl text-sm text-muted-foreground md:text-base"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
