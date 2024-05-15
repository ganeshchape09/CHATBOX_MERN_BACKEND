const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const router = require("./routes/index");
const cookiesParser = require("cookie-parser");
const { app, server } = require("./socket/index");

const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: "https://subtle-manatee-0ca198.netlify.app",
  credentials: true,
};

// const app = express();
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   })
// );

// app.use((req, res, next) => {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://subtle-manatee-0ca198.netlify.app"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookiesParser());

app.get("/", (request, response) => {
  response.json({
    message: "Server running at " + PORT,
  });
});

//api endpoints
app.use("/api", router);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("server running at " + PORT);
  });
});
