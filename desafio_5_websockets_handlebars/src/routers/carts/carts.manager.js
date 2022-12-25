import FileSystem from "fs";

class CartManager {
  constructor() {
    this.Path = "./src/routers/carts/CartsData.json";
    this.Carts = [];
  }

  addCart = (products) => {
    const CartID = !FileSystem.existsSync(this.Path)
      ? 0
      : JSON.parse(FileSystem.readFileSync(this.Path, "utf-8")).length;
    const cart = {
      id: CartID,
      products: products,
    };

    if (!FileSystem.existsSync(this.Path)) {
      this.Carts.push(cart);
      const WriteJson = JSON.stringify(this.Carts);
      FileSystem.writeFileSync(this.Path, WriteJson);
    } else {
      const ReadJson = JSON.parse(FileSystem.readFileSync(this.Path, "utf-8"));
      ReadJson.push(cart);
      const WriteJson = JSON.stringify(ReadJson);
      FileSystem.writeFileSync(this.Path, WriteJson);
    }
  };

  getCarts = () => {
    if (!FileSystem.existsSync(this.Path)) {
      return {
        status: "error",
        message: "No hay carritos en la lista, agregue al menos uno.",
      };
    } else {
      const Data = JSON.parse(FileSystem.readFileSync(this.Path, "utf-8"));
      return Data;
    }
  };

  addProductToCart = async (CartId, ProductId, ProductQuantityFromBody) => {
    const CartsFromDB = await this.getCarts();
    const FoundProduct = CartsFromDB[CartId].products.find(
      (x) => x.id == ProductId
    );
    if (!FoundProduct) {
      const NewProduct = {
        id: CartsFromDB[CartId].products.length,
        quantity: ProductQuantityFromBody,
      };
      CartsFromDB[CartId].products.push(NewProduct);
      const WriteJson = JSON.stringify(CartsFromDB);
      FileSystem.writeFileSync(this.Path, WriteJson);
    } else {
      CartsFromDB[CartId].products[ProductId] = {
        id: FoundProduct.id,
        quantity: FoundProduct.quantity + ProductQuantityFromBody,
      };
      const WriteJson = JSON.stringify(CartsFromDB);
      FileSystem.writeFileSync(this.Path, WriteJson);
    }
  };
}

export default CartManager;
