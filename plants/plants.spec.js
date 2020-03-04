const request = require("supertest");
const server = require("../api/server.js");

const db = require("../database/dbConfig.js");
const Plants = require("./plants-model.js");

describe("plants router", function() {
  it("should run the tests on plant router", function() {
    expect(true).toBe(true);
  });

  describe("GET /api/plants", function() {
    it("should return 200 OK", function() {
      return request(server)
        .get("/api/plants")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("should return plants as the router value", function() {
      return request(server)
        .get("/api/plants")
        .then(res => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });

    it("should return JSON formatted body", function() {
      return request(server)
        .get("/api/plants")
        .then(res => {
          expect(res.type).toMatch(/json/);
        });
    });
  });

  describe("plants model", () => {
    beforeEach(async () => {
      // this function executes and clears out the table before each test
      await db("plants").truncate();
    });
    describe("insert()", () => {
      // this example uses async/await to make it easier to read and understand
      it("should insert the provided plants into the db", async () => {
        // this code expects that the table is empty, we'll handle that below
        // add data to the test database using the data access file
        await Plants.insert({
          nickname: "roselia",
          species: "rose bush",
          frequency: "twice a month"
        });
        await Plants.insert({
          nickname: "roserade",
          species: "rose bush",
          frequency: "once a week"
        });

        // read data from the table
        const plants = await db("plants");

        // verify that there are now two records inserted
        expect(plants).toHaveLength(2);
      });
    });

    // note we're checking one plant at a time
    it("should insert the provided plant into the db", async () => {
      let plant = await Plants.insert({
        nickname: "roselia",
        species: "rose bush",
        frequency: "twice a month"
      });
      expect(plant.nickname).toBe("roselia");
      expect(plant.species).toBe("rose bush");
      expect(plant.frequency).toBe("twice a month");

      // note how we're reusing the plant variable
      plant = await Plants.insert({
        nickname: "roserade",
        species: "rose plant",
        frequency: "once a week"
      });
      expect(plant.nickname).toBe("roserade");
      expect(plant.species).toBe("rose plant");
      expect(plant.frequency).toBe("once a week");
    });
  });

  describe("DELETE /:id", function() {
    it("should test delete", function(done) {
      request(server)
        .delete("/:id")
        .send({ id: 1 })
        .expect(404, {}, done);
    });
  });
});
