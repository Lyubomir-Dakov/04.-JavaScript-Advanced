// The Create page is available to logged-in users

// Check if all the fields are filled before you send the request

// request -->   Method:    POST       URL: /data/memes

// body -->    { title, description, imageUrl }

// The service will return the newly created record

// Upon success, redirect the user to the All Memes page

import { html, render } from '../../node_modules/lit-html/lit-html.js';

const main = document.querySelector('main');

const createTemplate = () => html`
<section id="create-meme">
    <form id="create-form">
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>
`

export function createView() {
    render(createTemplate(), main);
}

