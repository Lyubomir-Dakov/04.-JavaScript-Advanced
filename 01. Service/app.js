window.addEventListener("load", solve);

function solve() {
    // get input fields and product type
    const input = {
        product: document.getElementById('type-product'),
        descriptiotn: document.getElementById('description'),
        name: document.getElementById('client-name'),
        phone: document.getElementById('client-phone')
    }

    // get buttons and addEventListeners to them
    const sendBtn = document.getElementsByTagName('button')[0];
    const clearBtn = document.getElementsByClassName('clear-btn')[0];
    sendBtn.addEventListener('click', send);
    clearBtn.addEventListener('click', clear);

    const completedOrders = document.getElementById('completed-orders');
    
    function send(event) {
        event.preventDefault();

        // validate input fields
        const product = input.product;
        const description = input.descriptiotn;
        const name = input.name;
        const phone = input.phone;

        if(description.value == '' || name.value == '' || phone.value == '') {
            return;
        }

        // add the information to section with id "received-orders" by creating new elements and HTML structure
        const receivedOrders = document.getElementById('received-orders')
        const div = document.createElement('div');
        div.className = 'container';
        div.innerHTML = `<h2>Product type for repair: ${product.value}</h2>
        <h3>Client information: ${name.value}, ${phone.value}</h3>
        <h4>Description of the problem: ${description.value}</h4>
        <button class='start-btn'>Start repair</button>
        <button class='finish-btn' disabled>Finish repair</button>`
        receivedOrders.appendChild(div);

        // clear the input fields
        description.value = '';
        name.value = '';
        phone.value = '';

        // get the start and finish button -> add eventListeners to them
        const startBtn = div.getElementsByClassName('start-btn')[0];
        const finishBtn = div.getElementsByClassName('finish-btn')[0];
        startBtn.addEventListener('click', start);
        finishBtn.addEventListener('click', finish);

        function start(event) {
            // when "Start repair" button is clicked -> enable the "Finish repair" and disable "Start repair"
            startBtn.disabled = true;
            finishBtn.disabled = false;
        }

        function finish(event) {
            // move div to section with the id "completed-orders" and remove the buttons from div
            completedOrders.appendChild(div);
            startBtn.remove();
            finishBtn.remove();
        }
    }

    function clear(event) {
        // when click 'clear' button remove all added div elements with class "container" form section completed orders
        const divElements = document.getElementById('completed-orders').querySelectorAll('div');
        for (let el of divElements) {
            el.remove();
        }
    }
}
