import { useForm } from "react-hook-form";
import Markdown from "react-markdown";
import axios from "axios";
import ChatInput from "./components/ChatInput";
import { useChatStore } from "./lib/store";
import { useEffect, useRef, useState } from "react";
import TypingIndicator from "./components/TypingIndicator";
import popSound from "@/assets/sounds/pop.mp3";
import notificationSound from "@/assets/sounds/notification.mp3";

const popAudio = new Audio(popSound);
popAudio.volume = 0.3;
const notificationAudio = new Audio(notificationSound);
notificationAudio.volume = 0.3;

export default function AIChatBot() {
   const [isBotTyping, setIsBotTyping] = useState(false);
   const lastMessageRef = useRef<HTMLDivElement>(null);
   const { history, addMessageToHistory } = useChatStore();
   const { register, handleSubmit, resetField, formState } = useForm<{
      prompt: string;
   }>({ defaultValues: { prompt: "" } });

   useEffect(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [history]);

   const onSubmit = async (data: { prompt: string }) => {
      addMessageToHistory({ role: "user", prompt: data.prompt });
      setIsBotTyping(true);
      popAudio.play();
      axios
         .post("http://localhost:5000/api/v1/chat", {
            prompt: data.prompt,
            history: history,
            userId: "user-123",
            sessionId: "session-123",
         })
         .then(({ data }) => {
            if (data.success) {
               addMessageToHistory({ role: "model", prompt: data.message });
               notificationAudio.play();
            }
         })
         .finally(() => {
            setIsBotTyping(false);
         });
   };
   const handleSubmitPrompt = (e: React.FormEvent) => {
      e.preventDefault();
      handleSubmit(onSubmit)();
      resetField("prompt");
   };

   return (
      <div className="max-w-2xl mx-auto h-screen">
         <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto scrollbar-thin pb-6">
               <div className="flex flex-col gap-3 my-2">
                  {history.map((msg, index) => (
                     <div
                        className={` px-2 rounded py-1 border ${msg.role === "user" ? "self-end bg-gray-100 max-w-[85%]" : "self-start  p-3"} `}
                        key={index}
                        ref={
                           index === history.length - 1 ? lastMessageRef : null
                        }
                     >
                        <Markdown>{msg.parts[0].text}</Markdown>
                     </div>
                  ))}

                  {isBotTyping && <TypingIndicator />}
               </div>
            </div>
            <ChatInput
               onSubmit={handleSubmitPrompt}
               register={register}
               formState={formState}
               isBotTyping={isBotTyping}
            />
         </div>
      </div>
   );
}
