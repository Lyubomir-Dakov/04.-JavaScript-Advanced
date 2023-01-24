// { "email": "peter@abv.bg", "password": "123456" }
// { "email": "mary@abv.bg", "password": "123456" }

// request --> Method: POST      URL: /users/login

// body --> { email, password }

// Upon success, the REST service will return the newly created object with --> _id ; accessToken
// you need to store this information using sessionStorage or localStorage

// If the login was successful, redirect the user to the All Memes page. 
// If there is an error, or the validations don’t pass, display an appropriate error message, using a system dialog (window.alert)

import { html, render } from '../../node_modules/lit-html/lit-html.js';

const main = document.querySelector('main');

const loginTemplate = () => html`
<section id="login">
    <form id="login-form">
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="#">Sign up</a>.</p>
            </div>
        </div>
    </form>
</section>
`

export function loginView() {
    render(loginTemplate(), main);
}