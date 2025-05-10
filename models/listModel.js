class List {
    constructor(name) {
        this.name = name;
    }
    
    static #lists = [];
    
    
    static add(list) {
        this.#lists.push(list);
    }

    static deleteByName(name) {
        this.#lists = this.#lists.filter((list) => list.name !== name);
    }

    static getAll() {
        return this.#lists;
    }

    static findByName(name) {
    return this.#lists.find((list) => list.name === name);
  }
}



module.exports = List;