// server.test.ts
import request from "supertest";
import server from "../examples/express-server"; // Update the import path to the actual path of your server file

describe("POST /webhook", () => {
  it("responds with XML and correct TwiML response for US numbers", async () => {
    const fakeData = {
      From: "+1234567890",
    };

    const response = await request(server)
      .post("/webhook")
      .send(fakeData)
      .type("form");

    expect(response.status).toBe(200);
    expect(response.type).toBe("text/xml");

    expect(response.text).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(response.text).toContain("<Response>");
    expect(response.text).toContain("<Message>Ahoy World</Message>");
  });

  it("responds with XML and correct TwiML response for UK numbers", async () => {
    const fakeData = {
      From: "+1234567890",
    };

    const response = await request(server)
      .post("/webhook")
      .send(fakeData)
      .type("form");

    expect(response.status).toBe(200);
    expect(response.type).toBe("text/xml");

    expect(response.text).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(response.text).toContain("<Response>");
    expect(response.text).toContain("<Message>Ahoy World</Message>");
  });

  it("responds with XML and correct TwiML response for DE numbers", async () => {
    const fakeData = {
      From: "+4915112341234",
    };

    const response = await request(server)
      .post("/webhook")
      .send(fakeData)
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
