function getInfo() {
    const input = document.getElementById('stopId');
    const checkBtn = document.getElementById('submit');
    const baseUrl = 'http://localhost:3030/jsonstore/bus/businfo';
    const stopName = document.getElementById('stopName');

    console.log(`${baseUrl}/${input.value}`);

    fetch(`${baseUrl}/${input.value}`)
        .then(response => response.json())
        .then(data => {
            let busses = data.busses;
            let name = data.name;
            stopName.textContent = name;
        });
}