export class MemoryRespository {
  #elements;
  constructor() {
    this.#elements = [];
  }

  async addElement(element) {
    this.#elements.push(element);
  }

  async getElements() {
    return [...this.#elements];
  }

  async getElementById(id) {
    const element = this.#elements.find((e) => e.id === id);
    if (element === undefined) throw new Error("element not found");

    return element;
  }

  async deleteElementById(id) {
    const index = this.#elements.findIndex((e) => e.id === id);
    if (index === -1) throw new Error("element not found");
    this.#elements.splice(index, 1);
  }

  async updateElement(id, element) {
    this.deleteElementById(id);
    this.addElements(element);
  }
}
