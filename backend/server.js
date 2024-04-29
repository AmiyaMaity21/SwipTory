const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/dbconfig");
const errorHandler = require("./middleware/errorHandler");
const user = require("./routes/userRoute");
const story = require("./routes/storyRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

dotenv.config();

connectDatabase();

app.use(express.json());
app.use(errorHandler);
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.ALLOW_ORIGIN }));

app.use("/api/v1/user", user);
app.use("/api/v1/story", story);

app.get("/api/health", (req, res) => {
  res.json({
    service: "SwipTory Backend API Server",
    status: "true",
    time: new Date(),
  });
});

app.use("/*", (req, res) => {
  res.status(404).json({ errorMessage: "Route not found" });
});

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend server running at http://${HOST}:${PORT}`);
});
