import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { Booking } from '../fixtures/bookingData';

export class BookingClient {
  constructor(private readonly request: APIRequestContext) {}
  list(): Promise<APIResponse> { return this.request.get('/booking'); }
  async get(id: number) {
    this.validateBookingId(id);
    return this.request.get(`/booking/${id}`); }
  create(booking: Booking): Promise<APIResponse> {
    return this.request.post('/booking', { data: booking });
  }
  async update(id: number, booking: Booking, token: string){
    this.validateBookingId(id);
    return this.request.put(`/booking/${id}`, {
      data: booking, headers: { Cookie: `token=${token}` },
    });
  }
 async patch(id: number, changes: Partial<Booking>, token: string){
    this.validateBookingId(id);
    return this.request.patch(`/booking/${id}`, {
      data: changes, headers: { Cookie: `token=${token}` },
    });
  }
  async delete(id: number, token: string){
    this.validateBookingId(id);
    return this.request.delete(`/booking/${id}`, { headers: { Cookie: `token=${token}` } });
  }
  private validateBookingId(bookingId: number): void {
  if (!Number.isInteger(bookingId) || bookingId <= 0) {
    throw new Error(
      `Invalid Booking ID: ${bookingId}. Booking ID must be a positive integer.`
    );
  }
}
}
