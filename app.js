const express = require("express");
const db = require("./config/mongo-connection");
const path = require("path");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const ownerRoutes = require("./routes/ownerRoutes");

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/owners", ownerRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
