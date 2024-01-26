import request from "supertest";
import server from "../examples/express-server";

describe("POST /webhook", () => {
  it("responds with XML and correct TwiML response for US numbers", async () => {
    const response = await request(server)
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
    const response = await request(server)
      .post("/webhook")
      .send({
        From: "+441234567890",
      })
      .type("form");

    expect(response.status).toBe(200);
    expect(response.type).toBe("text/xml");

    expect(response.text).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(response.text).toContain("<Response>");
    expect(response.text).toContain("<Message>Ahoy World</Message>");
  });

  it("responds with XML and correct TwiML response for DE numbers", async () => {
    const response = await request(server)
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
  server.close();
});
