import React, { useEffect } from "react";
import styles from "./CardWithDescription.module.scss";
import TiltCard from "../TiltCard/TiltCard";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

type ICardWithDescription = {
  type?: "primary" | "secondary";
  imgUrl?: string;
  title?: string;
  description?: string;
};

const showFromLeftVariant = {
  visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 1 } },
  hidden: { opacity: 1, scale: 1, x: "-100%", transition: { duration: 1 } },
};
const showFromRightVariant = {
  visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 1 } },
  hidden: { opacity: 1, scale: 1, x: "100%", transition: { duration: 1 } },
};

const CardWithDescription: React.FC<ICardWithDescription> = ({
  type = "primary",
  imgUrl,
  title = "Mythic Protocol",
  description = `${"Develop a comprehensive gaming platform incorporating an Ethereum-based payment system through blockchain technology (Web3), player progression tracking with a leaderboard, and a wide array of in-game features and items."}`,
}) => {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    }
  }, [control, inView]);
  return (
    <div className={styles["first-project"]}>
      <motion.div
        variants={showFromLeftVariant}
        ref={ref}
        initial="hidden"
        animate={control}
      >
        {type === "primary" && <TiltCard imgUrl={imgUrl} />}
      </motion.div>
      <motion.div
        variants={
          type === "primary" ? showFromRightVariant : showFromLeftVariant
        }
        ref={ref}
        initial="hidden"
        animate={control}
        className={`${styles["project-text-wrapper"]} ${
          type === "secondary" && styles["secondary"]
        }`}
      >
        <p className={styles["title"]}>{title}</p>
        <p
          className={`${styles["paragraph"]} ${
            type === "secondary" && styles["secondary"]
          }`}
        >
          {description}
        </p>
      </motion.div>
      <motion.div
        variants={showFromRightVariant}
        ref={ref}
        initial="hidden"
        animate={control}
      >
        {type === "secondary" && <TiltCard imgUrl={imgUrl} />}
      </motion.div>
    </div>
  );
};

export default CardWithDescription;
