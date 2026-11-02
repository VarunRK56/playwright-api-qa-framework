import { test, expect } from '../fixtures/api.fixture';
import { makeBooking } from '../fixtures/bookingData';
import { bookingSchema } from '../schemas/booking.schema';
import { createBooking, cleanupBooking } from '../utils/bookingLifecycle';

test('PUT updates a complete booking @smoke', async ({ bookings, auth }) => {
  const token = await auth.token();
  const id = await createBooking(bookings, makeBooking());
  try {
    const updated = makeBooking({ firstname: 'Updated', totalprice: 999 });
    const response = await bookings.update(id, updated, token);
    expect(response.status()).toBe(200);
    expect(bookingSchema.parse(await response.json())).toMatchObject(updated);
    const persisted = await bookings.get(id);
    expect(bookingSchema.parse(await persisted.json())).toMatchObject(updated);
  } finally { await cleanupBooking(bookings, id, token); }
});

test('PATCH updates only specified fields @smoke', async ({ bookings, auth }) => {
  const token = await auth.token();
  const original = makeBooking();
  const id = await createBooking(bookings, original);
  try {
    const response = await bookings.patch(id, { firstname: 'Patched' }, token);
    expect(response.status()).toBe(200);
    const actual = bookingSchema.parse(await response.json());
    expect(actual.firstname).toBe('Patched');
    expect(actual.lastname).toBe(original.lastname);
    expect(actual.totalprice).toBe(original.totalprice);
  } finally { await cleanupBooking(bookings, id, token); }
});

test('PUT without token is rejected @negative', async ({ bookings }) => {
  const response = await bookings.update(2147483647, makeBooking(), 'invalid-token');
  expect([401, 403]).toContain(response.status());
});
