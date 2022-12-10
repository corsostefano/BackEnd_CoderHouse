//Se importa dependencia “fs” de Node
const fs = require('fs');

class ProductManager {
  constructor() {
    this.Path = '.JsonDataBase.Json';
    this.Products = [];
  };
  addProduct = (title, description, price, thumbnail, code, stock) => {
    const product = {
      id: this.Products.length,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.Products.push(product);
    const WriteJson = JSON.stringify(this.Products);
    fs.writeFileSync(this.Path, WriteJson);
  };
  getProducts = () => {
    const Data = JSON.parse(fs.readFileSync(this.Path, 'utf-8'))
    return Data;
  };
}
module.exports = ProductManager;