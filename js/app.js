import ItemInput from './ItemInput';
import ItemList from './ItemList';

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
    showLinks = () => {
        const intro = introText.value,
            text = inputText.value,
            items = text.split(/\n/).map((t) => t.replace(/^\s+|\s+$/g, '')),
            shuffled = shuffle(items),
            encoded = shuffled.map((item) => btoa(JSON.stringify({ intro, item }))),
            currentUrl = location.protocol + '//' + location.hostname + location.port + location.pathname;

        output.innerHTML = '';

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

button.addEventListener('click', showLinks);

const itemList = new ItemList();

introText.parentElement.insertBefore(itemList.element(), introText.parentElement.nextSibling);

new ItemInput(inputText, itemList);
