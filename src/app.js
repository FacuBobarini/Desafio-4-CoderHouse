import express from "express";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js";
import { __dirname } from "./path.js";
import { engine } from "express-handlebars";
import * as path from "path";
import { Server } from "socket.io";
import { newProduct } from "./controllers/products.controller.js";
let products;
const app = express();
const PORT = 8080;
const server = app.listen(PORT);
const io = new Server(server);

app.engine("handlebars", engine()); //Config de hbs
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

io.on("connection", async (socket) => {
  socket.emit("products", (products = await newProduct.getProducts()));

  socket.on("deleteProduct", async (id) => {
    products = await newProduct.deleteProductById(id);
    io.sockets.emit("products", (products = await newProduct.getProducts()));
  });

  socket.on("addProducts", async (product) => {
    products = await newProduct.addProduct(product);
    io.sockets.emit("products", (products = await newProduct.getProducts()));
  });
});

app.use("/", express.static(__dirname + "/public"));
app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {
    title: "Desafio 4",
    mensaje: "Entrega 4- Product Manager",
  });
});
app.get("/", (req, res) => {
  res.render("home", {
    title: "Desafio 4",
    mensaje: "Desafio 4- Product Manager",
  });
});

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
