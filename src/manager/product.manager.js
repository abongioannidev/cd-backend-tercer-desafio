import { Product } from "../model/product.model.js";

export class ProductManager {
  repository;
  constructor(repository) {
    this.repository = repository;
  }

  async addProduct(product) {
    this.#validateInstance(product);
    await this.#validateFieldCode(product);
    const object = this.#productToObject(product);
    await this.repository.addElement(object);
  }

  async getProducts() {
    return await this.repository.getElements();
  }

  async getProductById(id) {
    try {
      return await this.repository.getElementById(id);
    } catch (error) {
      return error.message;
    }
  }

  async deleteProductById(id) {
    try {
      await this.repository.deleteElementById(id);
      return `product with id ${id} has been deleted`;
    } catch (error) {
      return error.message;
    }
  }

  async updateProduct(id, product) {
    this.#validateInstance(product);
    this.#validateFieldCode(product);
    try {
      const object = this.#productToObject(product);
      await this.repository.updateElement(id, object);
      return `product with id ${id} has been updated`;
    } catch (error) {
      return error.message;
    }
  }

  async #validateFieldCode(product) {
    const allProducts = (await this.getProducts()).map((object) =>
      this.#objectToProduct(object)
    );
    const result = allProducts.some((p) => p.equal(product));

    if (result) {
      throw new Error("There is already a product with that code");
    }
  }

  #validateInstance(object) {
    if (!(object instanceof Product)) {
      throw new Error("the value received is not a product");
    }
  }

  /**
   * Metodo utilizado para almacenar un objeto plano en el archivo
   * @param {Product} product instancia de producto a convertir a objeto plano
   * @returns {object} objeto plano
   */
  #productToObject(product) {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      code: product.code,
      stock: product.stock,
    };
  }
  /**
   * Metodo utilizado para pasar un objeto plano a una instancia de producto
   *
   * @param {any} object objeto plano
   * @returns {Product} una instancia de producto
   */
  #objectToProduct(object) {
    const { id, title, description, price, thumbnail, code, stock } = object;
    return new Product(code, title, description, price, thumbnail, stock, id);
  }
}
