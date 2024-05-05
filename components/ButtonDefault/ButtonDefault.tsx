import React, { useState } from "react";
import styles from "./ButtonDefault.module.scss";

type IButtonDefault = {
  onClick: () => void;
  btnText: string;
};

const ButtonDefault: React.FC<IButtonDefault> = ({ onClick, btnText }) => {
  const [isBtnHover, setIsBtnHover] = useState<boolean>(false);
  return (
    <div
      className={`${styles["button"]} ${
        isBtnHover ? styles["button-hover"] : ""
      }`}
      onClick={onClick}
      onMouseEnter={() => setIsBtnHover(true)}
      onMouseLeave={() => setIsBtnHover(false)}
    >
      <p className={styles["arrow"]}>&rarr;</p>
      <p className={styles["button-text"]}>{btnText}</p>

      <div
        className={`${styles["bar"]} ${isBtnHover ? styles["bar-hover"] : ""}`}
      />
    </div>
  );
};

export default ButtonDefault;
