export default function TypingIndicator() {
   return (
      <div
         className={
            "rounded-full bg-gray-100 border self-start px-3 py-2 flex gap-1"
         }
      >
         <div className="size-1.5 bg-gray-300 rounded-full animate-bounce"></div>
         <div className="size-1.5 bg-gray-300 rounded-full animate-bounce  delay-150"></div>
         <div className="size-1.5 bg-gray-300 rounded-full animate-bounce delay-300"></div>
      </div>
   );
}
