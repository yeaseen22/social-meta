import type React from "react"
import Skeleton from "@/components/widgets/Skeletion"
import styles from "@/styles/components/skeleton.module.scss"

const TweetCardSkeleton: React.FC = () => {
  return (
    <div className={styles.tweetCardWrapper}>
      <div className={styles.tweetCard}>
        {/* Header */}
        <div className={styles.cardHeader}>
          <Skeleton variant="circle" width={40} height={40} />
          <div className={styles.headerContent}>
            <Skeleton width={150} height={20} />
            <Skeleton width={100} height={16} />
          </div>
        </div>

        {/* Media */}
        <Skeleton height={194} />

        {/* Content */}
        <div className={styles.cardContent}>
          <Skeleton width={200} height={24} />
          <Skeleton height={60} />
        </div>

        {/* Actions */}
        <div className={styles.cardActions}>
          <Skeleton width={24} height={24} />
          <Skeleton width={50} height={20} />
          <Skeleton width={24} height={24} />
          <Skeleton width={50} height={20} />
        </div>
      </div>
    </div>
  )
}

export default TweetCardSkeleton

