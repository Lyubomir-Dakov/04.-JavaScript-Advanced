import { logout } from './api/users.js';
import { page, render } from './lib.js';
import { getUserData } from './util.js';

import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { homeView } from './views/home.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { profileView } from './views/profile.js';

const main = document.getElementById('content');

document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/profile', profileView);

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
        document.querySelectorAll('.user').forEach(el => el.style.display = 'inline')
        document.querySelectorAll('.guest').forEach(el => el.style.display = 'none')
    } else {
        document.querySelectorAll('.user').forEach(el => el.style.display = 'none')
        document.querySelectorAll('.guest').forEach(el => el.style.display = 'inline')
    }
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/');
}