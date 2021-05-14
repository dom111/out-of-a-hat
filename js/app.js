import ItemInput from './ItemInput.js';
import ItemList from './ItemList.js';

const decodeHash = () => {
        const data = document.location.hash.substr(1),
            decoded = atob(data ?? '');

        if (!decoded) {
            return null;
        }

        try {
            return JSON.parse(decoded);
        }
        catch (e) {
            return null;
        }
    },
    input = document.querySelector('.input'),
    inputTexts = input.querySelectorAll('textarea'),
    [introText, inputText] = inputTexts,
    button = input.querySelector('button'),
    output = document.querySelector('.output'),
    intro = output.querySelector('.intro'),
    item = output.querySelector('.item'),

    /**
     * @param itemList {ItemList}
     */
    showLinks = (itemList) => {
        const intro = introText.value,
            items = itemList.children().map((item) => item.name()),
            shuffled = shuffle(items),
            encoded = shuffled.map((item) => btoa(JSON.stringify({ intro, item }))),
            currentUrl = location.protocol + '//' + location.hostname + location.port + location.pathname;

        while (output.hasChildNodes()) {
            output.firstChild.remove();
        }

        encoded.forEach((item, i) => {
            const link = document.createElement('a');

            link.href = currentUrl + '#' + item;
            link.innerText = 'Item ' + (i + 1);

            link.addEventListener('click', (event) => {
                event.preventDefault();

                if (navigator.share) {
                    navigator.share({
                        url: link.href
                    })
                        .then(() => link.classList.add('done'));
                }
                else {
                    // TODO: toast
                    alert(`You'll need to long press on this link and copy the link to share manually...`);
                }
            });

            output.append(link);
            output.append(document.createElement('br'));
        });
    },
    shuffle = (array) => {
        const shuffled = [];

        while (array.length) {
            shuffled.push(...array.splice(Math.trunc(Math.random() * array.length), 1));
        }

        return shuffled;
    };

introText.addEventListener('input', ({ target }) => {
    target.style.height = '0px';

    const minHeight = 30,
        maxHeight = 160,
        { paddingTop, paddingBottom } = window.getComputedStyle(target),
        targetHeight = target.scrollHeight -
            (parseInt(paddingTop, 10) || 0) -
            (parseInt(paddingBottom, 10) || 0);

    target.style.height = Math.max(Math.min(targetHeight, maxHeight), minHeight) + 'px';
})

window.addEventListener('load', () => {
    const decodedData = decodeHash();

    if (decodedData === null) {
        input.style.display = 'block';

        return;
    }

    intro.innerText = decodedData.intro ?? '';
    item.innerText = decodedData.item;
    document.title = decodedData.item + ' - Pull x out of a hat';
});

const itemList = new ItemList(),
    itemInput = new ItemInput(inputText, itemList);

introText.parentElement.parentElement.insertBefore(itemList.element(), introText.parentElement.nextSibling);

button.addEventListener('click', () => {
    itemInput.convertToListItems();

    showLinks(itemList);
});
