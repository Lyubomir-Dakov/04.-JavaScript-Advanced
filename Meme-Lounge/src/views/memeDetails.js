// All users should be able to view details about memes. 
// Clicking the Details link in of a meme card should display the Details page. 
// If the currently logged-in user is the creator of the meme, the Edit and Delete buttons should be displayed, otherwise they should not be available.

// request -->     Method: GET          URL: /data/memes/:id

// Where :id is the id of the desired meme.
// The service will return a single object.

import { html, render } from '../../node_modules/lit-html/lit-html.js';

const main = document.querySelector('main');

const detailsTemplate = () => html`
<section id="meme-details">
    <h1>Meme Title: Bad code can present some problems

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src="/images/3.png">
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
                Being a programmer is a fun job. And many funny incidents occur throughout a
                programmer’s career.
                Here are a few jokes that can be relatable to you as a programmer.
            </p>

            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
            <a class="button warning" href="#">Edit</a>
            <button class="button danger">Delete</button>
            
        </div>
    </div>
</section>
`

export function detailsView() {
    render(detailsTemplate(), main);
}