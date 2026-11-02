
import { test, expect } from '@playwright/test';

test.describe('Booking API Tests', () => {

  test('GET - Fetch all bookings', async ({ request }) => {
    const response = await request.get('/booking');

    expect(response.status()).toBe(200);

    const bookings = await response.json();

    expect(Array.isArray(bookings)).toBeTruthy();
  });

  test('POST - Create and retrieve booking', async ({ request }) => {
    const booking = {
      firstname: 'QA',
      lastname: 'Automation',
      totalprice: 150,
      depositpaid: true,
      bookingdates: {
        checkin: '2027-03-10',
        checkout: '2027-03-15'
      },
      additionalneeds: 'Breakfast'
    };

    const createResponse = await request.post('/booking', {
      data: booking
    });

    expect(createResponse.status()).toBe(200);

    const created = await createResponse.json();
    expect(created.bookingid).toBeGreaterThan(0);

    const getResponse = await request.get(
      `/booking/${created.bookingid}`
    );

    expect(getResponse.status()).toBe(200);

    const savedBooking = await getResponse.json();

    expect(savedBooking.firstname).toBe(booking.firstname);
    expect(savedBooking.totalprice).toBe(booking.totalprice);
  });

});
