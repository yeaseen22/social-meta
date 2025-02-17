import Skeleton from "@/components/widgets/Skeletion"

export default function PostCardSkeleton() {
  return (
    <div className='postCardSkeleton'>
      <div className='content'>
        <Skeleton width="100px" height="40px" />
      </div>
    </div>
  )
}

