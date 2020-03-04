const request = require("supertest");
const server = require("../api/server.js");

const randomNum = Math.random() * 3000;

const testLogin = {
  username: `user${randomNum}`,
  password: "lambdaschool",
  phone_number: `${randomNum}`
};

const testPlant = {
  nickname: "Plant",
  species: "Plant",
  frequency: "once a month"
};

describe("GET Plants", () => {
  it("REGISTER: should return with a status of 201", async function() {
    await request(server)
      .post("/api/auth/register")
      .send(testLogin)
      .then(res => {
        expect(res.status).toBe(201);
      });
  });
  it("LOGIN: returns a token after login", () => {
    return request(server)
      .post("/api/auth/login")
      .send(testLogin)
      .then(res => {
        const currentToken = res.body.token;
        return request(server)
          .post("/api/plants")
          .set("authorization", currentToken)
          .send(testPlant)
          .then(res => {
            expect(res.status).toBe(201);
          });
      });
  });
});

//
