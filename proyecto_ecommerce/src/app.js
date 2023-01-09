const express = require("express")
require("dotenv").config()
const app = express()
const productRoutes = require("./routes/product.routes.js")
const cartRoutes = require("./routes/cart.routes.js")
const errorRoutes = require("./routes/error.routes.js")

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/products", productRoutes)
app.use("/api/carts", cartRoutes)
app.use("*", errorRoutes)

const PORT= 8080
const server = app.listen(PORT, () => 
console.log(`🚀 Server started on port http://localhost:${PORT}`))
server.on('error', (err) => console.log(err));