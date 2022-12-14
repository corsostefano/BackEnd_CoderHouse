//Manejo de archivos
const fs = require('fs')

class ProductManager{
  constructor(){
    this.Path = "./JsonDataBase.json";
    this.Products = [];
    this.ProductsFound = undefined;
    this.ProblemController = 'Sin errores en la ejecucion'
  }
  addProduct = (title, description, price, thumbnail, code, stock) => {
    const product = {
      id: this.Products.length,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    }
    this.Products.push(product);
    const WriteJson = JSON.stringify(this.Products);
    fs.writeFileSync(this.Path, WriteJson);
  }
  getProducts = () => {
    const Data = JSON.parse(fs.readFileSync(this.Path, "utf-8"));
    return Data;
  }
  getProductById = (id) => {
    const AllProductsId = this.getProducts().map((x) => x.id);
    if (AllProductsId.includes(id)){
      return (this.ProductFound = this.getProducts() [id]);
    }else if (id === undefined){
      return (this.ProductFound = "Error, no se indico el id del producto");
    }else{
      return(this.ProductFound = "Error, no se encontro el id del producto")
    }
  }
  updateProduct = ({
    id, 
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
  }) => {
    const AllProducts = this.getProducts();

    if( 
      !id ||
      !title ||
      !description ||
      !price ||
      !thumbnail ||
      !code ||
      !stock
      ) {
        return (this.ProblemController = "Error, existen campos de productos sin definir" )
      }else{
        AllProducts[id] = {
          id: id,
          title: title,
          description: description,
          price: price,
          thumbnail: thumbnail,
          code: code,
          stock: stock,
        }
        const WriteJson = JSON.stringify(AllProducts);
        fs.writeFileSync(this.Path, WriteJson)
      }
  };
  deleteProduct = (id) => {
    if (!id){
      return (this.ProblemController = "Error, el id del producto que esta tratando de eliminar no se a definido");
    } else{
      const AllProducts = this.getProducts();
      const NewAllProducts = AllProducts.filter((obj) => obj.id !== id);
      const WriteJson = JSON.stringify(NewAllProducts);
      fs.writeFileSync(this.Path, WriteJson);
    }
  }
}
const Program = new ProductManager();

//Agregar Productos

Program.addProduct("Aromatizador Textil L??nea Cl??sica 500 ml", "Te propone reforzar la perfumaci??n obtenida con las varas difusoras en el ambiente, con el uso del aromatizador textil.", 3500, "Imagen", 232, 43);
Program.addProduct("Hammam Aceite Corporal de Arg??n 250 ml", "??leo de Arg??n, ??leo de Maracuy??: controla la oleosidad de la piel y la hidrata. Repara los tejidos de la piel, por lo que se usa como tratamiento antiedad", 5900, "Imagen", 233, 35);
Program.addProduct("Difusor por Varas L??nea Cl??sica 250 ml.", "logra el balance perfecto entre calidad y cantidad de fragancia, garantizando una experiencia duradera y agradable en el ambiente.", 5000, "Imagen", 234, 22);
Program.addProduct("Eau de Parfum Morocco ELLE 100 ml", "Las Esencias Morocco son superiores a un Eau de Parfum y su duraci??n es superior a lo que estamos habituados.", 9000, "Imagen", 235, 10);

//---------------      -----------------//

//Buscar producto por id

//Program.getProductById(2);

//---------------     -----------------//

//Actualizar producto por id 
/*
Program.updateProduct({
  id: 3 ,
  title: "Eau de Parfum Morocco ELLE 100 ml",
  description: "Las Esencias Morocco son superiores a un Eau de Parfum y su duraci??n es superior a lo que estamos habituados.",
  price: 12000,
  thumbnail: "Imagen",
  code: 235,
  stock: 3,
});
*/
//-------------    ------------//

//eliminar producto por id 

//Program.deleteProduct(1);

//ejecutar programa

console.log(Program);
console.log(
  "\n------------------\n\nProducts list (After all changes):\n\n",
  Program.getProducts()
);