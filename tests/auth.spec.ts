import { test, expect } from '../fixtures/api.fixture';

test('POST auth returns a valid token @smoke', async ({ auth }) => {
  const token = await auth.token();
  expect(token.length).toBeGreaterThan(0);
});

test('POST auth with invalid credentials is rejected @negative', async ({ request }) => {
  const response = await request.post('/auth', {
    data: { username: 'invalid', password: 'invalid' },
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.reason).toBe('Bad credentials');
  expect(body.token).toBeUndefined();
});
