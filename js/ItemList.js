export class ItemList {
    /** @property {Item[]} */
    #children = [];

    /** @property {HTMLDivElement} */
    #element = (() => {
       const element = document.createElement('div');

       element.classList.add('itemList');

       return element;
    })();

    /** @param item {Item} */
    add(item) {
        if (this.#children.some((child) => child.name() === item.name())) {
            return false;
        }

        this.element.append(item.element());

        this.#children.push(item);

        return true;
    }

    /** @returns {HTMLUListElement} */
    element() {
        return this.#element;
    }

    /** @param item {Item} */
    remove(item) {
        const index = this.#children.indexOf(item);
        if (index === -1) {
            return false;
        }

        item.element().remove();

        this.#children.splice(index, 1);

        return true;
    }
}

export default ItemList;
