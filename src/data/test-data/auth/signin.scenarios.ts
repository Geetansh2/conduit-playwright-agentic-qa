export const loginScenarios = {
  validUser: {
    email: "geetanshbhatia12@gmail.com",
    password: "12345"
  },

  invalidUser: {
    email: "test@test.com",
    password: "Password123",
    expectedError: "email password is invalid",
  },
};