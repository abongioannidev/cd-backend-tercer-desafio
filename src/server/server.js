import express from "express";
import { FileSystemRepository } from "../repositories/file-system.repository.js";
import { ProductManager } from "../manager/product.manager.js";
import { Product } from "../model/product.model.js";
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Instancio el repositorio
 */
const fileSystemRepository = new FileSystemRepository("productos.json");
const productManager = new ProductManager(fileSystemRepository); // aca se puede usar una instancia de memoryRespository o  fileSystemRepository

const router = express.Router();

router.get("/", async (req, res) => {
  const { limit } = req.query;
  let products = await productManager.getProducts();

  if (limit) {
    products = products.slice(0, limit);
  }

  res.status(200).send(products);
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const id = Number(pid);
  try {
    let product = await productManager.getProductById(id);
    res.status(200).send(product);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.use("/products", router);

const server = app.listen(PORT, async () => {
  await initializeData();
  console.log(`app listening ons port ${server.address().port}`);
});

const initializeData = async () => {
  const nameProducts = [
    "Lavadora",
    "Refrigerador",
    "Microondas",
    "Licuadora",
    "Aspiradora",
    "Horno eléctrico",
    "Batidora",
    "Cafetera",
    "Secadora de ropa",
    "Lavavajillas",
  ];

  for (const p in nameProducts) {
    const code = `code-${p}`;
    const title = `title-${p}`;
    const description = `description-${p}`;
    const stock = Math.floor(Math.random() * 100) + 1;
    const price = Math.floor(Math.random() * 10000) + 1;
    const thumbnail = `thumbnail-${p}`;
    const prodcut = new Product(
      code,
      title,
      description,
      price,
      thumbnail,
      stock
    );
    await productManager.addProduct(prodcut);
  }
};
