import express from 'express';
//Router
import productsRouter from "../src/routers/products/products.router.js";
import cartsRouter from "../src/routers/carts/carts.router.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Router
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


const PORT= 8080
const server = app.listen(PORT, () => 
console.log(`🚀 Server started on port http://localhost:${PORT}`))
server.on('error', (err) => console.log(err));