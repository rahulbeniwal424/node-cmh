const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const apiError = require("./utils/apiError");
const { globalErrHandler } = require("./utils/globalErrHandler");
// access environment variables
require("dotenv").config();
// connect to database
require("./config/database");
// middleware
app.use(express.urlencoded({ extended: true })); // pass income payload
// routes
app.use(bodyParser.json({ limit: '1mb' })); 
const userRouters = require("./routes/User");
const authRouters = require("./routes/Auth");
const categoryRouters = require("./routes/Category");
const postRouters = require("./routes/Post");
const commentRouters = require("./routes/Comment");
const machine = require("./routes/Machine");
const plant = require("./routes/Plant");
const employeeRoutes = require("./routes/Employe");
const enquiryRoutes = require("./routes/Enquiry");
// routes middlware
app.use(cors());
app.use("/api/users", userRouters);
app.use("/api/auth", authRouters);
app.use("/api/categories", categoryRouters);
app.use("/api/posts", postRouters);
app.use("/api/comments", commentRouters);
app.use("/api/machines", machine);
app.use("/api/plants", plant);
app.use("/enquiries", enquiryRoutes);
app.use('/employees', employeeRoutes);
// 404 error
app.all("*", (req, res, next) => {
  // create error
  const err = new apiError(`Can't find this route ${req.originalUrl}`, 400);
  // send it to Global errors handling middlware
  next(err);
});

// Global Error Handlers Middleware
app.use(globalErrHandler);
// Listen To Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
