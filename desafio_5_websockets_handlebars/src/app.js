import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';

//Router
import productsRouter from "../src/routers/products/products.router.js";
import cartsRouter from "../src/routers/carts/carts.router.js";

app.use(express.static('src/public'));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', 'src/views');

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

const io = new Server(httpServer);
app.set('websocket', io);
io.on('connection', () => {
    console.log("Cliente conectado.");
});