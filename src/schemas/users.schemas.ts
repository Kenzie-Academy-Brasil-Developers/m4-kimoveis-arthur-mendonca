import { z } from "zod";

const userCreationRequestSchema = z.object({
  name: z.string().max(45),
  email: z.string().email().max(45),
  password: z.string().max(45),
  admin: z.boolean().default(false),
});

const userCreationResponseSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  // admin: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

const returnAllUsersResponseSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string().max(45),
    email: z.string().email().max(45),
    admin: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
  })
);

const userUpdateRequestSchema = userCreationResponseSchema
  .omit({
    deletedAt: true,
    createdAt: true,
    id: true,
  })
  .partial();

const userUpdateResponseShema = z.array(returnAllUsersResponseSchema);

export {
  userCreationResponseSchema,
  userCreationRequestSchema,
  returnAllUsersResponseSchema,
  userUpdateRequestSchema,
  userUpdateResponseShema,
};
