const { Router } = require("express")
const router = Router()
const CartController = require("../controllers/cart.controller")
const cartController = new CartController()

router.post("/", cartController.createCart)
router.delete("/:id", cartController.deleteCart)
router.get("/:id/products", cartController.getCartProducts)
router.post("/:id/products/:productId", cartController.addProductToCart)
router.delete("/:id/products/:productId", cartController.deleteProductFromCart)


module.exports = router