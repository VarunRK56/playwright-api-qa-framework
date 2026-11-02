import { z } from 'zod';

export const bookingSchema = z.object({
  firstname: z.string(), lastname: z.string(), totalprice: z.number(),
  depositpaid: z.boolean(),
  bookingdates: z.object({ checkin: z.string(), checkout: z.string() }),
  additionalneeds: z.string().optional(),
});
export const createdBookingSchema = z.object({
  bookingid: z.number().int().positive(), booking: bookingSchema,
});
export const bookingListSchema = z.array(z.object({ bookingid: z.number().int().positive() }));
