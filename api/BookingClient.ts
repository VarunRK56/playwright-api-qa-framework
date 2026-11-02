import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { Booking } from '../fixtures/bookingData';

export class BookingClient {
  constructor(private readonly request: APIRequestContext) {}
  list(): Promise<APIResponse> { return this.request.get('/booking'); }
  get(id: number): Promise<APIResponse> { return this.request.get(`/booking/${id}`); }
  create(booking: Booking): Promise<APIResponse> {
    return this.request.post('/booking', { data: booking });
  }
  update(id: number, booking: Booking, token: string): Promise<APIResponse> {
    return this.request.put(`/booking/${id}`, {
      data: booking, headers: { Cookie: `token=${token}` },
    });
  }
  patch(id: number, changes: Partial<Booking>, token: string): Promise<APIResponse> {
    return this.request.patch(`/booking/${id}`, {
      data: changes, headers: { Cookie: `token=${token}` },
    });
  }
  delete(id: number, token: string): Promise<APIResponse> {
    return this.request.delete(`/booking/${id}`, { headers: { Cookie: `token=${token}` } });
  }
}
