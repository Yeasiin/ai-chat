import type { FormState, UseFormRegister } from "react-hook-form";
import { Button } from "./ui/button";

export default function ChatInput({
   onSubmit,
   register,
   formState,
   isBotTyping,
}: {
   onSubmit: (e: React.FormEvent) => void;
   register: UseFormRegister<{ prompt: string }>;
   formState: FormState<{
      prompt: string;
   }>;
   isBotTyping: boolean;
}) {
   const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
         // e.preventDefault();
         onSubmit(e);
      }
   };

   return (
      <div>
         <form onKeyDown={handleKeyDown} onSubmit={onSubmit}>
            <div className="flex flex-col items-end gap-2 p-4 border-2 rounded-3xl border-dark-200 ">
               <textarea
                  autoFocus
                  placeholder="Ask anything"
                  className="w-full border-0 focus:outline-0 resize-none"
                  maxLength={1000}
                  {...register("prompt", {
                     required: "Prompt is required",
                     setValueAs: (v) => v.trim(),
                  })}
               />
               <Button
                  disabled={!formState.isValid || isBotTyping}
                  onClick={onSubmit}
                  className="rounded-full size-9"
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="0.88em"
                     height="1em"
                     viewBox="0 0 448 512"
                  >
                     <path
                        fill="currentColor"
                        d="m34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4"
                     />
                  </svg>
               </Button>
            </div>
         </form>
      </div>
   );
}
