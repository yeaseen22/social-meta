import type React from "react"
import styles from "@/styles/components/skeleton.module.scss"

type SkeletonProps = {
  width?: string | number
  height?: string | number
  variant?: "circle" | "rect"
}

const Skeleton: React.FC<SkeletonProps> = ({ width = "100%", height = "100%", variant = "rect" }) => {
  const style = { width, height }

  return <span className={`${styles.skeleton} ${variant === "circle" ? styles.circle : ""}`} style={style}></span>
}

export default Skeleton

