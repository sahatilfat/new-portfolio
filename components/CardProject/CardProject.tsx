import React, { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import styles from "./CardProject.module.scss";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const CardProject = () => {
  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div
      className={styles["container"]}
      ref={ref}
      onMouseMove={(e) => {
        setIsMouseEnter(true);
        handleMouseMove(e);
      }}
      onMouseLeave={() => {
        setIsMouseEnter(false);
        handleMouseLeave();
      }}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
    >
      <div
        className={styles["content-wrapper"]}
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
      >
        <img src="/assets/img/projects/riftstorm.png" alt="card-image" />
        <div className={styles["layer-shadow"]}></div>
      </div>
    </motion.div>
  );
};

export default CardProject;
