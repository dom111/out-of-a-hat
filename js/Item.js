export class Item {
    /** @property {HTMLDivElement} */
    #element = document.createElement('div');

    /** @property {ItemList} */
    #itemList;

    /** @property {string} */
    #name;

    /**
     * @param name {string}
     * @param itemList {ItemList}
     */
    constructor(name, itemList) {
        this.#name = name;
        this.#itemList = itemList;

        const label = document.createElement('span'),
            remove = document.createElement('button');

        label.innerText = this.#name;

        remove.classList.add('btn', 'btn-danger');

        remove.addEventListener('click', () => this.#itemList.remove(this));

        this.#element.append(label, remove);
    }

    /** @returns {HTMLLIElement} */
    element() {
        return this.#element;
    }

    /** @returns {string} */
    name() {
        return this.#name;
    }
}

export default Item;
