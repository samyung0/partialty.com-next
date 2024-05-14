import z from 'zod';

export const CloudinarySchema = z.object({
  width: z.number(),
  height: z.number(),
  bytes: z.number(),
  pixels: z.number(),
  secure_url: z.string(),
  public_id: z.string(),
});
