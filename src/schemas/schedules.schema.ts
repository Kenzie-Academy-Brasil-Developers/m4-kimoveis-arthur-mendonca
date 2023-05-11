import z from "zod";

const scheduleCreationSchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
});

const scheduleResponseSchema = scheduleCreationSchema.extend({
  id: z.number(),
  userId: z.number(),
});

export { scheduleCreationSchema, scheduleResponseSchema };
