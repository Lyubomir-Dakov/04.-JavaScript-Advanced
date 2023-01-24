// By given username, email, password and gender (Male or Female) the app should register a new user in the system. 
// All fields are required – if any of them is empty, display an error

// request -->       Method: POST       URL: /users/register

// body -->     { username, email, password, gender }

// Upon success, the REST service will return the newly created object with -->  _id    accessToken
// you need to store this information using sessionStorage or localStorage

// If the registration was successful, redirect the user to the All Memes page. 
// If there is an error, or the validations don’t pass, display an appropriate error message, using a system dialog (window.alert).


import { html, render } from '../../node_modules/lit-html/lit-html.js';

const main = document.querySelector('main');

const registerTemplate = () => html`
<section id="register">
    <form id="register-form">
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="#">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>
`

export function registerView() {
    render(registerTemplate(), main);
}