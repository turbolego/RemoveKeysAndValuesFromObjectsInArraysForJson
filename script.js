document.getElementById('inputJson').addEventListener('input', populateKeys);

function populateKeys() {
    const inputJson = document.getElementById('inputJson').value;
    let keys = [];
    try {
        const json = JSON.parse(inputJson);
        if (Array.isArray(json) && json.length > 0) {
            keys = Object.keys(json[0]);
        }
    } catch (e) {
        console.error('Invalid JSON');
    }

    const select = document.getElementById('keysToRemove');
    select.innerHTML = '';
    keys.forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        select.appendChild(option);
    });
}

function removeKeys() {
    const inputJson = document.getElementById('inputJson').value;
    const keysToRemove = Array.from(document.getElementById('keysToRemove').selectedOptions).map(option => option.value);
    let outputJson = '';

    try {
        const json = JSON.parse(inputJson);
        const updatedJson = json.map(obj => {
            keysToRemove.forEach(key => delete obj[key]);
            return obj;
        });
        outputJson = JSON.stringify(updatedJson, null, 2);
    } catch (e) {
        outputJson = 'Invalid JSON';
    }

    document.getElementById('outputJson').value = outputJson;
}
