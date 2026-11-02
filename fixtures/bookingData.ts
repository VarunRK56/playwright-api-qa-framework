export interface Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: { checkin: string; checkout: string };
  additionalneeds: string;
}

export function makeBooking(overrides: Partial<Booking> = {}): Booking {
  return {
    firstname: 'QA', lastname: `Test${Date.now()}`,
    totalprice: 150, depositpaid: true,
    bookingdates: { checkin: '2027-03-10', checkout: '2027-03-15' },
    additionalneeds: 'Breakfast', ...overrides,
  };
}
