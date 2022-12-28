// /* eslint-disable no-undef */
// const express = require("express");
// const request = require("supertest");

// const {
//   userRegisterValidation,
// } = require("../middlewares/validationMiddleware");

// const { asyncWrapper } = require("../helpers/apiHelpers");

// const { signup } = require("../controllers/signup");

// const app = express();

// app.post("/signup", userRegisterValidation, asyncWrapper(signup));

// describe("test signup controller", () => {
//   beforeAll(() => app.listen(3000));

//   test("respons status 200", async () => {
//     const response = await request(app).post("/api/users");
//     expect(response.status).toBe(200);
//   });
// });
