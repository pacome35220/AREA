const request = require('supertest');
const { app } = require('../src/app');

describe('API endpoints', () => {
    it('should return 200 on GET /', async () => {
        const res = await request(app).get('/');

        expect(res.status).toBe(200);
        expect(res.text).toBe('Api is UP');
    });

    it('should return 401 on GET /user/me with no header', async () => {
        const res = await request(app).get('/user/me');

        expect(res.status).toBe(401);
        expect(res.text).toBe('Missing Authorization header with Basic\n');
    });
});
