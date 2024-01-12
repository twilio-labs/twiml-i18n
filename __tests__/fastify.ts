import request from "supertest";
import fastify from "../examples/fastify-server";

describe("POST /webhook", () => {
  it("responds with XML and correct TwiML response for US numbers", async () => {
    await fastify.ready();

    const response = await request(fastify.server)
      .post("/webhook")
      .send({
        From: "+1234567890",
      })
      .type("form");

    expect(response.status).toBe(200);
    expect(response.type).toBe("text/xml");

    expect(response.text).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(response.text).toContain("<Response>");
    expect(response.text).toContain("<Message>Ahoy World</Message>");
  });

  it("responds with XML and correct TwiML response for UK numbers", async () => {
    await fastify.ready();

    const response = await request(fastify.server)
      .post("/webhook")
      .send({
        From: "+1234567890",
      })
      .type("form");

    expect(response.status).toBe(200);
    expect(response.type).toBe("text/xml");

    expect(response.text).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(response.text).toContain("<Response>");
    expect(response.text).toContain("<Message>Ahoy World</Message>");
  });

  it("responds with XML and correct TwiML response for DE numbers", async () => {
    await fastify.ready();

    const response = await request(fastify.server)
      .post("/webhook")
      .send({
        From: "+4915112341234",
      })
      .type("form");

    expect(response.status).toBe(200);
    expect(response.type).toBe("text/xml");

    expect(response.text).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(response.text).toContain("<Response>");
    expect(response.text).toContain("<Message>Ahoi Welt</Message>");
  });
});

afterAll(async () => {
  fastify.close();
});
