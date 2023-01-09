const { Router } = require("express")
const router = Router()
const ProductClass = require("../controllers/product.controller.js")
const productController = new ProductClass("../database/product.json")


router.get("/", productController.getAll)
router.get("/:id", productController.getById)
router.post("/", productController.addProduct)
router.put("/:id", productController.updateProduct)
router.delete("/:id", productController.deleteById)



module.exports = router