import { test as base, expect } from '@playwright/test';
import { BookingClient } from '../api/BookingClient';
import { AuthClient } from '../api/AuthClient';

type ApiFixtures = { bookings: BookingClient; auth: AuthClient };
export const test = base.extend<ApiFixtures>({
  bookings: async ({ request }, use) => { await use(new BookingClient(request)); },
  auth: async ({ request }, use) => { await use(new AuthClient(request)); },
});
export { expect };
