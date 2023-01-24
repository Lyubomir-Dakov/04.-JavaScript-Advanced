// The Edit page is available to logged-in users and it allows authors to edit their own memes. 
// Clicking the Edit link of a particular meme on the Details page should display the Edit page, with all fields filled with the data for the meme. 
// It contains a form with input fields for all relevant properties. 
// Check if all the fields are filled before you send the request.

// request -->      Method: PUT        URL: /data/memes/:id                           Where :id is the id of the desired meme
// body -->         { title, description, imageUrl }

// The service will return the modified record.
// Note that PUT requests do not merge properties and will instead replace the entire record. 
// Upon success, redirect the user to the Details page for the current meme

import { html, render } from '../../node_modules/lit-html/lit-html.js';

const main = document.querySelector('main');

const editTemplate = () => html`
<section id="edit-meme">
    <form id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description">
                    Programming is often touted as a smart and lucrative career path.
                    It's a job that (sometimes) offers flexibility and great benefits.
                    But it's far from sunshine and Nyan Cat rainbows. The hours are long.
                    The mistakes are frustrating. And your eyesight is almost guaranteed to suffer.
                    These memes cover most of the frustration (and funny moments) of programming.
                    At least we can laugh through the pain. 
                </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>
`

export function editView() {
    render(editTemplate(), main);
}