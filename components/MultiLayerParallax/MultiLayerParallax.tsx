import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import React, { useRef, useEffect } from "react";
import styles from "./MultiLayerParallax.module.scss";
import { useInView } from "react-intersection-observer";

const boxVariant = {
  visible: { opacity: 1, scale: 1, x: 0 },
  hidden: { opacity: 1, scale: 1, x: "-100%" },
};

export default function MultiLayerParallax() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "500%"]);

  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    }
  }, [control, inView]);

  return (
    <div ref={containerRef} className={styles["container"]}>
      <motion.h1 style={{ y: textY }} className={styles["parallax-text"]}>
        <motion.div
          className={styles["text-wrapper"]}
          ref={ref}
          variants={boxVariant}
          initial="hidden"
          animate={control}
          transition={{ duration: 0.5 }}
        >
          <p className={styles["title"]}>
            Who‘s the magician behind the curtains?
          </p>
          <p className={styles["paragraph"]}>
            Simply said, it‘s the mythical creature known as a Web Developer,
            specifically an extraordinary one, ready to push the buttons and
            pull the levers to transform your run-of-the-mill website into a
            starship of creative brilliance.
          </p>
        </motion.div>
      </motion.h1>

      <div
        className={styles["img2"]}
        style={{
          backgroundImage: `url(/assets/img/image-bottom.png)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
}
