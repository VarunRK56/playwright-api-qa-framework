import { test, expect } from '../fixtures/api.fixture';
import { makeBooking } from '../fixtures/bookingData';
import { createdBookingSchema } from '../schemas/booking.schema';
import { cleanupBooking } from '../utils/bookingLifecycle';

test('POST creates a booking and validates schema @smoke', async ({ bookings, auth }) => {
  const token = await auth.token();
  const data = makeBooking();
  const response = await bookings.create(data);
  expect(response.status()).toBe(200);
  const created = createdBookingSchema.parse(await response.json());
  try {
    expect(created.booking).toMatchObject(data);
    const fetched = await bookings.get(created.bookingid);
    expect(fetched.status()).toBe(200);
  } finally { await cleanupBooking(bookings, created.bookingid, token); }
});
