import { z } from "zod";

export const inputSchema = z.object({
  input: z.string().min(1, { message: "Input is required" }),
});
export type Input = z.infer<typeof inputSchema>;
