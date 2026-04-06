import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterAnimationProps {
  target: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}

const CounterAnimation = ({ target, suffix = "", prefix = "", className = "", duration = 2 }: CounterAnimationProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, target, {
        duration,
        ease: "easeOut",
        onUpdate: (v) => setDisplay(Math.round(v)),
      });
      return controls.stop;
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
};

export default CounterAnimation;
