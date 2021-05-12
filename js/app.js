const decodeHash = () => {
        const data = document.location.hash.substr(1),
            decoded = atob(data ?? '');

        if (decoded.match(/^[\x20-\x7e]+$/)) {
            return decoded;
        }

        return null;
    },
    input = document.querySelector('.input'),
    inputText = input.querySelector('textarea'),
    output = document.querySelector('.output');

inputText.addEventListener('change', () => {
    const text = inputText.value,
        items = text.split(/\n/).map((t) => t.replace(/^\s+|\s+$/g, '')),
        shuffled = items.sort(() => Math.trunc(Math.random() * 3) - 1),
        encoded = shuffled.map((item) => btoa(item)),
        currentUrl = location.protocol + '//' + location.hostname + location.port + location.pathname;

    output.innerHTML = encoded.map((item) => currentUrl + '#' + item).join('<br/>');
});

window.addEventListener('load', () => {
    const decodedData = decodeHash();

    if (decodedData === null) {
        input.style.display = 'block';

        return;
    }

    output.innerHTML = decodedData;
    document.title = decodedData + ' - Pull x out of a hat';
});

window.addEventListener('hashchange', (a, b, c) => console.log(a, b, c));