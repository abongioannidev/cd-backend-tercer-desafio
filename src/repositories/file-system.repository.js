import fs from "fs";
import path from "path";

export class FileSystemRepository {
  #pathFile;
  #basePath;
  constructor(fileName) {
    this.#basePath = "data";
    this.#setPathFile(fileName);
    this.#createFolder();
    this.#saveDataIntoFile([]);
  }

  async #createFolder() {
    if (this.#folderNotExists()) {
      await fs.promises.mkdir(this.#basePath);
    }
  }

  #setPathFile(value) {
    if (value !== undefined && value.trim() !== "") {
      this.#pathFile = path.join(this.#basePath, value);
    } else {
      throw new Error("file name is required");
    }
  }

  async #readDataFromFile() {
    try {
      const data = await fs.promises.readFile(this.#pathFile, {
        encoding: "utf-8",
      });
      return JSON.parse(data);
    } catch (error) {
      console.error(error.message);
      return [];
    }
  }

  async #saveDataIntoFile(data) {
    await fs.promises.writeFile(this.#pathFile, JSON.stringify(data), {
      encoding: "utf-8",
    });
  }

  async addElement(element) {
    const elements = await this.getElements();

    elements.push(element);

    await fs.promises.writeFile(this.#pathFile, JSON.stringify(elements), {
      encoding: "utf-8",
    });
  }

  getElements() {
    return this.#readDataFromFile();
  }

  async getElementById(id) {
    const elements = await this.getElements();
    const element = elements.find((e) => e.id === id);
    if (element === undefined) throw new Error("element not found");

    return element;
  }

  async deleteElementById(id) {
    const elements = await this.getElements();
    const index = elements.findIndex((e) => e.id === id);
    if (index === -1) throw new Error("element not found");
    this.elements.splice(index, 1);
    await this.#saveDataIntoFile(elements);
  }

  async updateElement(id, element) {
    await this.deleteElementById(id);
    await this.addElements(element);
  }

  #folderNotExists() {
    return !fs.existsSync(this.#basePath);
  }
}
