import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

const AnimatedText = ({ text, className = "", delay = 0, as: Tag = "h1" }: AnimatedTextProps) => {
  const letters = text.split("");

  return (
    <Tag className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: delay + i * 0.03, duration: 0.4, ease: "easeOut" }}
          className="inline-block"
          style={{ whiteSpace: letter === " " ? "pre" : undefined }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </Tag>
  );
};

export default AnimatedText;
