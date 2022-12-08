class ProductManager {
    constructor() {
      this.Products = [];
      this.ProblemController = "Sin errores en la ejecucion";
      this.ProductFound = undefined;
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
      };
  
      if (this.Products.find((x) => x.code === code)) {
        this.ProblemController =
          "Error, el codigo del producto ya se encuentra agregado";
      } else if (
        product.title === undefined ||
        product.description === undefined ||
        product.price === undefined ||
        product.thumbnail === undefined ||
        product.code === undefined ||
        product.stock === undefined
      ) {
        this.ProblemController =
          "Oops, it seems that one of products field is empty";
      } else {
        this.Products.push(product);
      }
    };
  
    getProducts = () => {
      return this.Products;
    };
  
    getProductById = (id) => {
      const AllProductsId = this.Products.map((x) => x.id);
      if (AllProductsId.includes(id)) {
        return (this.ProductFound = this.Products.filter((x) => x.id === id));
      } else {
        return (this.ProductFound = "Id not specified or product not found");
      }
    };
  }
  
  const Program = new ProductManager();
  
  /*Agregar Productos*/
  
  Program.addProduct("Aromatizador Textil Línea Clásica 500 ml", "Te propone reforzar la perfumación obtenida con las varas difusoras en el ambiente, con el uso del aromatizador textil.", 3500, "Imagen", 232, 43);
  Program.addProduct("Hammam Aceite Corporal de Argán 250 ml", "Óleo de Argán, Óleo de Maracuyá: controla la oleosidad de la piel y la hidrata. Repara los tejidos de la piel, por lo que se usa como tratamiento antiedad", 5900, "Imagen", 233, 35);
  Program.addProduct("Difusor por Varas Línea Clásica 250 ml.", "logra el balance perfecto entre calidad y cantidad de fragancia, garantizando una experiencia duradera y agradable en el ambiente.", 5000, "Imagen", 234, 22);
  Program.addProduct("Eau de Parfum Morocco ELLE 100 ml", "Las Esencias Morocco son superiores a un Eau de Parfum y su duración es superior a lo que estamos habituados.", 9000, "Imagen", 235, 10);
  
  
  /*Buscar producto por id*/
  
  Program.getProductById(3);
  
  /*ejecucion del programa */
  
  console.log(Program);