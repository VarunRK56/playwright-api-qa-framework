import { expect } from '@playwright/test';
import { BookingClient } from '../api/BookingClient';
import { createdBookingSchema } from '../schemas/booking.schema';
import type { Booking } from '../fixtures/bookingData';

export async function createBooking(client: BookingClient, data: Booking): Promise<number> {
  const response = await client.create(data);
  expect(response.status()).toBe(200);
  const parsed = createdBookingSchema.parse(await response.json());
  expect(parsed.booking.firstname).toBe(data.firstname);
  return parsed.bookingid;
}
export async function cleanupBooking(client: BookingClient, id: number, token: string): Promise<void> {
  const response = await client.delete(id, token);
  expect(response.status(), `Cleanup failed for booking ${id}`).toBe(201);
}
