import { Link, Outlet } from "react-router";

export default function SummarizerLayout() {
   return (
      <div>
         <Outlet />
         <div className="max-w-2xl mx-auto mt-4 border-t">
            <div className="flex gap-4">
               <Link className="hover:underline" to={"/summarizer/1"}>
                  Product 1
               </Link>
               <Link className="hover:underline" to={"/summarizer/2"}>
                  Product 2
               </Link>
               <Link className="hover:underline" to={"/summarizer/3"}>
                  Product 3
               </Link>
               <Link className="hover:underline" to={"/summarizer/4"}>
                  Product 4
               </Link>
               <Link className="hover:underline" to={"/summarizer/5"}>
                  Product 5
               </Link>
            </div>
         </div>
      </div>
   );
}
