const fs = require("fs")
require("dotenv").config()
let products
const isAdmin = true
const filePath = "src/database/product.json"
module.exports = class ProductController {
    constructor() {
    }
    async getAll(req, res) {
        try {
            products = await fs.promises.readFile(filePath, 'utf-8')
            res.status(200).json(JSON.parse(products))
        } catch (error) {
            console.log("Error en getAll", error);
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params
            products = await fs.promises.readFile(filePath, 'utf-8')
            products = JSON.parse(products)
            console.log(req)
            console.log(id)
            const product = products.find((product) => product.id == id)
            res.json(product)
        } catch (error) {
            console.log("Error en getById", error);
        }
    }

    async addProduct(req, res) {
        if (isAdmin === true) {
            try {
                const { title, description, code, thumbnails, price, stock } = req.body
                products = await fs.promises.readFile(filePath, 'utf-8')
                products = JSON.parse(products)
                const product = { timestamp: Date.now(), title: title, description: description, code: code, thumbnails: thumbnails, price: price, stock: stock }
                if (products.length === 0) {
                    product.id = 1
                }
                else {
                    const lastId = products[products.length - 1].id
                    product.id = lastId + 1
                }
                products.push(product)
                await fs.promises.writeFile(filePath, JSON.stringify(products))
                res.status(201).json({ Exito: "producto agregado con exito!" })
            } catch (error) {
                console.log("Error en addProduct", error);
            }
        }
        else {
            res.status(403).json({ error: -1, description: "No estas autorizado a ver esta ruta" })
        }
    }
    async updateProduct(req, res) {
        if (isAdmin === true) {
            try {
                const { id } = req.params
                const { title, description, code, thumbnails, price, stock } = req.body
                products = await fs.promises.readFile(filePath, 'utf-8')
                products = JSON.parse(products)
                if (isNaN(id)) {
                    res.status(400).json({ Error: "El parametro ingresado no es un numero" })
                }
                const index = products.findIndex(product => product.id === Number(id))
                if (index === -1) {
                    res.status(404).json({ Error: "El producto no existe" })
                }
                const productUpdated = { timestamp: Date.now(), title: title, description: description, code: code, thumbnails: thumbnails, price: price, stock: stock }
                products[index] = productUpdated
                await fs.promises.writeFile(filePath, JSON.stringify(products))
                res.status(200).json({ productUpdated })
            } catch (error) {
                console.log("Error en updateProduct", error)
            }
        }
        else {
            res.status(403).json({ error: -1, description: "No estas autorizado a ver esta ruta" })
        }
    }
    async deleteById(req, res) {
        if (isAdmin === true) {
            try {
                const { id } = req.params
                products = await fs.promises.readFile(filePath, 'utf-8')
                products = JSON.parse(products)
                if (isNaN(id)) {
                    res.status(400).json({ Error: "El parametro ingresado no es un numero" })
                }
                const product = products.filter(filterProduct => filterProduct.id === Number(id))
                if (!product) {
                    res.status(404).json({ Error: "El producto no existe" })
                }
                products = products.filter(filterProduct => filterProduct.id !== Number(id))
                await fs.promises.writeFile(filePath, JSON.stringify(products))
                res.status(200).json(`Producto con id : ${id} eliminado exitosamente`)
            } catch (error) {
                console.log("Error en deleteById", error);
            }
        }
        else {
            res.status(403).json({ error: -1, description: "No estas autorizado a ver esta ruta" })
        }
    }
    async deleteByIdFromCart(id) {
        try {
            products = await fs.promises.readFile(filePath, 'utf-8')
            products = JSON.parse(products)
            if (isNaN(id)) {
                res.status(400).json({ Error: "El parametro ingresado no es un numero" })
            }
            const product = products.filter(filterProduct => filterProduct.id === Number(id))
            if (!product[0]) {
                res.status(404).json({ Error: "El producto no existe" })
            }
            return product[0]
        } catch (error) {
            console.log("Error en deleteById", error);
        }
    }
}

