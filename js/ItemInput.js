import Item from './Item';

export class ItemInput {
    /** @property {HTMLTextAreaElement} */
    #element;

    /** @property {ItemList} */
    #itemList;

    /**
     * @param element {HTMLTextAreaElement}
     * @param itemList {ItemList}
     **/
    constructor(element, itemList) {
        this.#element = element;
        this.#itemList = itemList;

        this.bindEvents();
    }

    bindEvents() {
        this.#element.addEventListener('keyup', this.convertToListItems);
        this.#element.addEventListener('paste', this.convertToListItems);
    }

    convertToListItems() {
        const items = this.#element.value.trim()
            .split(/\n/)
            .map((item) => item.trim());

        while (items.length > 1) {
            const item = items.shift()
                .trim();

            if (item.length === 0) {
                continue;
            }

            if (! this.#itemList.add(new Item(item, this.#itemList))) {
                // TODO: flash of some sort
                console.error(`Couldn't add item '${item}', it probably already exists in the collection.`);
            }
        }
    }
}

export default ItemInput;
