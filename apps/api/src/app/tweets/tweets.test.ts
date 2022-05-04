import * as request from "supertest"
import app from "../index"

describe('Tweets', () => {
  test('get all tweets', async () => {
    const response = await request(app).get('/tweets')

    console.log(response.statusCode)
    expect(response.statusCode).toEqual(200)
    // expect(response.body)
  })
})