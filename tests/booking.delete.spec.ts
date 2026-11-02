import { test, expect } from '../fixtures/api.fixture';
import { makeBooking } from '../fixtures/bookingData';
import { createBooking } from '../utils/bookingLifecycle';

test('DELETE removes booking @smoke', async ({ bookings, auth }) => {
  const token = await auth.token();
  const id = await createBooking(bookings, makeBooking());
  const response = await bookings.delete(id, token);
  expect(response.status()).toBe(201);
  const fetched = await bookings.get(id);
  expect(fetched.status()).toBe(404);
});

test('DELETE without valid token is rejected @negative', async ({ bookings }) => {
  const response = await bookings.delete(2147483647, 'invalid-token');
  expect([401, 403]).toContain(response.status());
});
