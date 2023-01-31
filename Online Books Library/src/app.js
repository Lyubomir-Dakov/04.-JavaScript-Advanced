//  VAJNO DA SE DOBAVI V HEAR NA HTML-A -->  <script src="/src/app.js" type="module"></script>
// localhost:3000  ne se refreshva sam i sled vsqka promqna trqbva da go refreshvame s butona

// import * as api from './api/users.js';

// window.api = api; // testvame api dali raboti pravilno - spira servara (go live) i startira ot terminala  s "npm start", servara koito e vlojen v proekta
// localhost:3000

import { logout } from './api/users.js';
import { page, render } from './lib.js';
import { getUserData } from './util.js';
import { dashboardView } from './views/dashboard.js';

import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { loginView } from './views/login.js';
import { profileView } from './views/userPage.js';
import { registerView } from './views/register.js';

const main = document.getElementById('site-content');

document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/home', dashboardView);
page('/books/:id', detailsView);
page('/edit/:id', editView);
page('/login', loginView);
page('/register', registerView);
page('/create', createView);
page('/myBooks', profileView);

// start application
updateNav();
page.start();

// middleware
function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNav = updateNav;
    next();
}


function renderMain(templateResult) {
    render(templateResult, main);
}

function updateNav() {
    const userData = getUserData();
    if (userData) {
        document.getElementById('user').style.display = 'block'
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user').querySelector('span').textContent = `Welcome, ${userData.email}`
    } else {
        document.getElementById('user').style.display = 'none'
        document.getElementById('guest').style.display = 'block'
    }
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/home');          
}