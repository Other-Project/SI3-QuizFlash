module.exports = [
  {
    context: "/api",
    target: process.env["BACK_URL"] ?? "http://localhost:9428",
    secure: false,
  },
];
