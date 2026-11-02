
import { test, expect } from '../fixtures/api.fixture';

test.describe('Booking ID Validation', () => {

  test('Reject negative booking ID', async ({ bookings }) => {
    await expect(
      bookings.get(-1)
    ).rejects.toThrow('Invalid Booking ID');
  });

  test('Reject zero booking ID', async ({ bookings }) => {
    await expect(
      bookings.get(0)
    ).rejects.toThrow('Invalid Booking ID');
  });

  test('Reject decimal booking ID', async ({ bookings }) => {
    await expect(
      bookings.get(1.5)
    ).rejects.toThrow('Invalid Booking ID');
  });

});
