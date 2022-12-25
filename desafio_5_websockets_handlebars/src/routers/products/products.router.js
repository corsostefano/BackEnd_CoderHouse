import { Router } from "express";
import ProductManager from "./products.manager.js";

const router = Router();
const manager = new ProductManager();

router.get("/", async (req, res) => {
  const ProductsFromDB = await manager.getProducts();
  const Limit = req.query.limit;
  if (!Limit) {
    res.send({ ProductsFromDB });
  } else if (Limit <= ProductsFromDB.length) {
    res.send({ ProductsSolicited: ProductsFromDB.slice(0, Limit) });
  } else {
    res.send({
      status: "error",
      message: "Los Productos no se pueden mostrar. Compruebe nuevamente su consulta",
    });
  }
});

router.get("/:pid", async (req, res) => {
  const ProductsFromDB = await manager.getProducts();
  const IdParam = req.params.pid;

  const FindProductByParam = ProductsFromDB[IdParam];

  if (!FindProductByParam) {
    res.send({
      status: "error",
      message:
        "Producto no encontrado. Por favor verifique el id del producto.",
    });
  } else {
    res.send(FindProductByParam);
  }
});

router.post("/", (req, res) => {
  const product = req.body;
  if (
    !product.title ||
    !product.description ||
    !product.code ||
    !product.price ||
    !product.status ||
    !product.stock ||
    !product.category
  ) {
    res.send({
      status: "error",
      message: "Algunos de los campos obligatorios no han sido configurados.",
    });
  } else {
    manager.addProduct(
      product.title,
      product.description,
      product.code,
      product.price,
      product.status,
      product.stock,
      product.category,
      product.thumbnails
    );
    res.send({ status: "success", message: "Producto agregado con éxito" });
  }
});

router.put("/:pid", async (req, res) => {
  const IdParam = req.params.pid;
  const ProductUpdated = req.body;
  if (IdParam > manager.getProducts().length - 1 || isNaN(IdParam)) {
    res.send({
      status: "error",
      message:
        "El producto que busca no ha sido encontrado, por favor verifique el id escrito.",
    });
  } else if (
    !ProductUpdated.title ||
    !ProductUpdated.description ||
    !ProductUpdated.code ||
    !ProductUpdated.price ||
    !ProductUpdated.status ||
    !ProductUpdated.stock ||
    !ProductUpdated.category
  ) {
    res.send({
      status: "error",
      message: "Algunos de los campos obligatorios no han sido configurados.",
    });
  } else {
    manager.updateProduct(
      IdParam,
      ProductUpdated.title,
      ProductUpdated.description,
      ProductUpdated.code,
      ProductUpdated.price,
      ProductUpdated.status,
      ProductUpdated.stock,
      ProductUpdated.category,
      ProductUpdated.thumbnails
    );
    res.send({ status: "success", message: "Product updated successfully." });
  }
});

router.delete("/:pid", (req, res) => {
  const IdParam = req.params.pid;
  if (IdParam > manager.getProducts().length - 1 || isNaN(IdParam)) {
    res.send({
      status: "error",
      message:
        "El producto que busca no ha sido encontrado, por favor verifique el id escrito.",
    });
  } else {
    manager.deleteProduct(IdParam);
    res.send({ status: "success", message: "Producto eliminado con éxito." });
  }
});

export default router;
