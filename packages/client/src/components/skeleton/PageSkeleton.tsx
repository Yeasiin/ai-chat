import Skeleton from "react-loading-skeleton";

export default function PageSkeleton() {
   return (
      <div className="">
         <Skeleton />
         <Skeleton />
         <Skeleton width={"60%"} />
      </div>
   );
}
