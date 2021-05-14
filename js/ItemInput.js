import Item from './Item.js';

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
        this.#element.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter') {
                return;
            }

            event.preventDefault();

            this.convertToListItems();
        });
    }

    convertToListItems() {
        const items = this.#element.value
            .split(/\n/)
            .map((item) => item.trim());

        while (items.length > 0) {
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

        this.#element.value = items.join('\'n');
    }
}

export default ItemInput;
