import { z } from "zod";

const envVariable = z.object({
   NODE_ENV: z.string(),
   GEMINI_API_KEY: z.string(),
   HUGGING_FACE_API_KEY: z.string(),
   PORT: z.string(),
});

envVariable.parse(process.env);

declare global {
   namespace NodeJS {
      interface ProcessEnv extends z.infer<typeof envVariable> {}
   }
}
