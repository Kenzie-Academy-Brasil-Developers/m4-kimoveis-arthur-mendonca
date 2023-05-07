import { z } from "zod";

const getLoggedUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export { getLoggedUserSchema };
