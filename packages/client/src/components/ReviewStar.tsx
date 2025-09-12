import OutlineStarIcon from "./icons/OutlineStarIcon";
import StarIcon from "./icons/StarIcon";

export default function ReviewStar({ rating }: { rating: number }) {
   const placeholders = [1, 2, 3, 4, 5];
   return (
      <div className="flex gap-1 text-yellow-500">
         {placeholders.map((e) => {
            if (e > rating) {
               return <OutlineStarIcon key={e} />;
            } else {
               return <StarIcon key={e} />;
            }
         })}
      </div>
   );
}
