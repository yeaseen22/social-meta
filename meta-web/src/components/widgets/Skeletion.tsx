import React from "react";
import styles from "@/styles/components/tweetcard.module.scss";

type SkeletonProps = {
  width?: string | number;
  height?: string | number;
  variant?: "circle" | "rect";
};

const Skeleton: React.FC<SkeletonProps> = ({ width = "100%", height = "100%", variant = "rect" }) => {
  const style = { width, height };

  return (
    <span className={`${styles.skeleton} ${styles[variant]}`} style={style}></span>
  );
};

export default Skeleton;
