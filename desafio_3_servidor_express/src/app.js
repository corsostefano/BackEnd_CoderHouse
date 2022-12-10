//Se importa la dependencia instalada de express js
const express = require('express');
//Se importa el archivo productmanager
const ProductManager = require('./productmanager');

//Se transforma la dependencia de express en una constante llamada app
const App = express();
const Manager = new ProductManager();

//Generacion de nuevos productos
App.get("/", (req, res) => {
  Manager.addProduct(
    "Aromatizador Textil Línea Clásica 500 ml",
    "Te propone reforzar la perfumación obtenida con las varas difusoras en el ambiente, con el uso del aromatizador textil.",
    3500,
    "Imagen",
    232,
    43
  );
  Manager.addProduct(
    "Hammam Aceite Corporal de Argán 250 ml",
    "Óleo de Argán, Óleo de Maracuyá: controla la oleosidad de la piel y la hidrata. Repara los tejidos de la piel, por lo que se usa como tratamiento antiedad",
    5900, 
    "Imagen", 
    233, 
    35
  );
  Manager.addProduct(
    "Difusor por Varas Línea Clásica 250 ml.",
    "logra el balance perfecto entre calidad y cantidad de fragancia, garantizando una experiencia duradera y agradable en el ambiente.",
    5000,
    "Imagen",
    234, 
    22
  );
  Manager.addProduct(
    "Eau de Parfum Morocco ELLE 100 ml",
    "Las Esencias Morocco son superiores a un Eau de Parfum y su duración es superior a lo que estamos habituados.",
    9000,
    "Imagen", 
    235,
    10
  );
  res.send('Productos generados exitosamente!');
});
App.get('/products', async (req, res) => {
  const ProductsFromDB = await Manager.getProducts();
  const Limit = req.query.limit;

  if (!Limit ){
    res.send({Product: ProductsFromDB});
  }else if(Limit <= ProductsFromDB.length){
    return res.send({ProductsSolicited: ProductsFromDB.skice(0, Limit)});
  }else{
    res.send('Error, los productos no se pueden visualizar');
  }
});
App.get('/products/:pid', async (req, res) => {
  const ProductsFromDB = await Manager.getProducts();
  const IdParam = req.params.pid;
  const FindProductByParam = ProductsFromDB[IdParam];

  if(!FindProductByParam){
    res.send('Producto no encontrado. Verifique si la identificación del producto que está buscando está incluida en la lista de productos');
  }else{
    res.send(FindProductByParam)
  }
});

//Puerto Local / localhost 8080
const Port = 8080;

App.listen(Port, () => console.log('Servidor express ejecutándose.'));




