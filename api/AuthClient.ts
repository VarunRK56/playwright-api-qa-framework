import { expect, type APIRequestContext } from '@playwright/test';

export class AuthClient {
  constructor(private readonly request: APIRequestContext) {}
  async token(): Promise<string> {
    const username = process.env.BOOKER_USERNAME ?? 'admin';
    const password = process.env.BOOKER_PASSWORD ?? 'password123';
    const response = await this.request.post('/auth', { data: { username, password } });
    expect(response.status(), 'Authentication endpoint should return 200').toBe(200);
    const body: unknown = await response.json();
    if (typeof body !== 'object' || body === null || !('token' in body) ||
        typeof body.token !== 'string' || !body.token) {
      throw new Error(`Authentication failed: ${JSON.stringify(body)}`);
    }
    return body.token;
  }
}
