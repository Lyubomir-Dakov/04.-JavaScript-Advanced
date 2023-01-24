import page from '../node_modules/page/page.mjs';
import { getUserData } from './util.js';

import { allMemesView } from './views/allMemes.js';
import { createView } from './views/createMeme.js';
import { homeView } from './views/homePage.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { userProfileView } from './views/userProfile.js';

page('/home', homeView);
page('/allMemes', allMemesView);
page('/login', loginView);
page('/register', registerView);
page('/createMeme', createView);
page('/edit/:id', () => console.log('Lets edit this page'));
page('/details/:id', () => console.log('Details of this page'));
page('/myProfile', userProfileView)

page.start()

export function updateNav() {
    const userData = getUserData();
    if (userData) {
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}