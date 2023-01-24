// The initial screen should display the navigation, register, login and the initial image + footer.
// Note: This page should be only visible for guest users. Logged-in users should be redirected to the All Memes page.

import { html, render } from '../../node_modules/lit-html/lit-html.js';

const main = document.querySelector('main');

const homeTemplate = () => html`
<section id="welcome">
    <div id="welcome-container">
        <h1>Welcome To Meme Lounge</h1>
        <img src="/images/welcome-meme.jpg" alt="meme">
        <h2>Login to see our memes right away!</h2>
        <div id="button-div">
            <a href="/login" class="button">Login</a>
            <a href="register" class="button">Register</a>
        </div>
    </div>
</section>
`

export function homeView() {
    render(homeTemplate(), main);
}


