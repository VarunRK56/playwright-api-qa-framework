import { test, expect } from '../fixtures/api.fixture';
import { makeBooking } from '../fixtures/bookingData';
import { bookingListSchema, bookingSchema } from '../schemas/booking.schema';
import { createBooking, cleanupBooking } from '../utils/bookingLifecycle';

test('GET booking list @smoke', async ({ bookings }) => {
  const response = await bookings.list();
  expect(response.status()).toBe(200);
  bookingListSchema.parse(await response.json());
});

test('GET booking by ID @smoke', async ({ bookings, auth }) => {
  const token = await auth.token();
  const data = makeBooking();
  const id = await createBooking(bookings, data);
  try {
    const response = await bookings.get(id);
    expect(response.status()).toBe(200);
    const actual = bookingSchema.parse(await response.json());
    expect(actual).toMatchObject(data);
  } finally { await cleanupBooking(bookings, id, token); }
});

test('GET nonexistent booking returns 404 @negative', async ({ bookings }) => {
  const response = await bookings.get(2147483647);
  expect(response.status()).toBe(404);
});
