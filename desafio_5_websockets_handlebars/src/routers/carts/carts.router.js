import { Router } from "express";
import CartManager from "./carts.manager.js";

const router = Router();
const manager = new CartManager();

router.post("/", (req, res) => {
  const products = req.body;
  manager.addCart(products);
  res.send({ status: "success", message: "Carrito añadido con éxito." });
});

router.get("/:cid", async (req, res) => {
  const IdParam = req.params.cid;
  const CartsFromDB = await manager.getCarts();
  const FindCartByParam = CartsFromDB[IdParam];
  if (!FindCartByParam) {
    res.send({
      status: "error",
      message:
        "Carrito no encontrado.",
    });
  } else {
    const CartProducts = FindCartByParam.products;
    res.send(CartProducts);
  }
});

router.post("/:cid/product/:pid", (req, res) => {
  const CartIdParam = req.params.cid;
  const ProductIdParam = req.params.pid;
  const BodyProduct = req.body;
  manager.addProductToCart(CartIdParam, ProductIdParam, BodyProduct.quantity);
  res.send({
    status: "success",
    message: "Producto o unidades añadidas con éxito.",
  });
});

export default router;
