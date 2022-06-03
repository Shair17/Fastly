import z from 'zod';

export const LocationInformationSchema = z.object({
  name: z.string(),
  street: z.string(),
  instructions: z.string(),
  zip: z.string(),
  city: z.string(),
});
