// Each logged-in user should be able to view his own profile by clicking [My Profile]. 
// Username, Email and My memes count should be filled with the data for the current user. 
// Note that the Gender of the user determines which picture is displayed as their avatar.

// If there are no memes -->     No memes in database.

// request -->    Method: GET        URL: /data/memes?where=_ownerId%3D%22{userId}%22&sortBy=_createdOn%20desc       
// Where {userId} is the id of the currently logged-in user

// The service will return an array of memes.


import { html, render } from '../../node_modules/lit-html/lit-html.js';

const main = document.querySelector('main');

const userProfileTemplate = () => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/female.png">
        <div class="user-content">
            <p>Username: Mary</p>
            <p>Email: mary@abv.bg</p>
            <p>My memes count: 2</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        <!-- Display : All created memes by this user (If any) -->
        <div class="user-meme">
            <p class="user-meme-title">Java Script joke</p>
            <img class="userProfileImage" alt="meme-img" src="/images/1.png">
            <a class="button" href="#">Details</a>
        </div>
        <div class="user-meme">
            <p class="user-meme-title">Bad code can present some problems</p>
            <img class="userProfileImage" alt="meme-img" src="/images/3.png">
            <a class="button" href="#">Details</a>
        </div>

        <!-- Display : If user doesn't have own memes  -->
        <p class="no-memes">No memes in database.</p>
    </div>
</section>
`

export function userProfileView() {
    render(userProfileTemplate(), main);
}