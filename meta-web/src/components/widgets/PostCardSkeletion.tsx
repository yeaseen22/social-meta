import Skeleton from "@/components/widgets/Skeletion"
import styles from "@/styles/components/post-card-skeleton.module.scss"

export default function PostCardSkeleton() {
  return (
    <div className={styles.postCardSkeleton}>
      <div className={styles.content}>
        <Skeleton width="100px" height="40px" />
      </div>
    </div>
  )
}

