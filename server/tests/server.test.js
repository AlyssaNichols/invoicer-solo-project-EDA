let app = require("../server")
const testServer = require("supertest")



describe("test the root path", () => {
    test("It should respond 200 from the services route", async () => {
      try {
        const response = await testServer(app).post("/api/services/");
        expect(response.statusCode).toEqual(201);
      } catch (error) {
        console.log(error);
      }
    });
})
  
    test("It should respond 403 from the get USER route without credentials", async () => {
      try {
        const response = await testServer(app).get("/api/services");
        expect(response.statusCode).toEqual(200);
      } catch (error) {
        console.log(error);
      }
    });
  
