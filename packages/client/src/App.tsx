import { useForm } from "react-hook-form";
import Markdown from "react-markdown";
import axios from "axios";
import ChatInput from "./components/ChatInput";
import { useChatStore } from "./lib/store";

function App() {
   const { history, addMessageToHistory } = useChatStore();
   const {
      register,
      handleSubmit,
      resetField,
      formState: { errors },
   } = useForm<{ prompt: string }>({ defaultValues: { prompt: "" } });

   const onSubmit = async (data: { prompt: string }) => {
      addMessageToHistory({ role: "user", prompt: data.prompt });

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
            }
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
            <div className="flex-1">
               <div className="flex flex-col gap-2 my-2">
                  {history.map((msg) => (
                     <div
                        className={` px-2 rounded py-1 border ${msg.role === "user" ? "self-end bg-gray-100 max-w-[85%]" : "self-start  p-3"} `}
                        key={msg.parts[0].text}
                     >
                        <Markdown>{msg.parts[0].text}</Markdown>
                     </div>
                  ))}
               </div>
            </div>
            <ChatInput
               onSubmit={handleSubmitPrompt}
               register={register}
               errors={errors}
            />
         </div>
      </div>
   );
}

export default App;
