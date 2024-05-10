import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Airdrop.module.scss";
import "./Airdrop.module.scss";

const Airdrop = () => {
  const [glitch, setGlitch] = useState(false);

  // Function to toggle glitch effect
  const toggleGlitch = () => {
    setGlitch(!glitch);
  };

  return (
    <div
      className={`glitch-container ${glitch ? "glitch" : ""}`}
      onClick={toggleGlitch}
    >
      <h1 className="text">Glitch Effect</h1>
    </div>
  );
};

export default Airdrop;
