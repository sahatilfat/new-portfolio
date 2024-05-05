import React from "react";
import styles from "./BounceText.module.scss";
import TextSpan from "./TextSpan";

type IBounceText = {
  text: string;
};

const BounceText: React.FC<IBounceText> = ({ text }) => {
  return (
    <div className={styles["container"]}>
      {text.split("").map((letter, index) => {
        return (
          <TextSpan key={index}>{letter === " " ? "\u00a0" : letter}</TextSpan>
        );
      })}
    </div>
  );
};

export default BounceText;
