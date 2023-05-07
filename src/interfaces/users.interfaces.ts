import { z } from "zod";
import {
  returnAllUsersResponseSchema,
  userCreationRequestSchema,
  userCreationResponseSchema,
  userUpdateRequestSchema,
} from "../schemas/users.schemas";

type TuserCreationDataInterface = z.infer<typeof userCreationRequestSchema>;

type TuserCreationResponse = z.infer<typeof userCreationResponseSchema>;

type TReturnAllUsersResponseSchema = z.infer<
  typeof returnAllUsersResponseSchema
>;

type TUserUpdateRequestSchema = z.infer<typeof userUpdateRequestSchema>;

export {
  TuserCreationDataInterface,
  TuserCreationResponse,
  TReturnAllUsersResponseSchema,
  TUserUpdateRequestSchema,
};
