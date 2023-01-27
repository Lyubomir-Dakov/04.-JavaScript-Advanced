import { getEventByUser } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const profileTemplate = (events, userData) => html`
<section id="profilePage">
    <div class="userInfo">
        <div class="avatar">
            <img src="./images/profilePic.png">
        </div>
        <h2>${userData.email}</h2>
    </div>
    <div class="board">

        ${events.length == 0 ? html`
        <div class="no-events">
            <p>This user has no events yet!</p>
        </div>
        ` : events.map(eventCard)}

    </div>
</section>
`

const eventCard = (ev) => html`
<div class="eventBoard">
    <div class="event-info">
        <img src=${ev.imageUrl}>
        <h2>${ev.title}</h2>
        <h6>${ev.date}</h6>
        <a href="/details/${ev._id}" class="details-button">Details</a>
    </div>
</div>
`

export async function profileView(ctx) {
    const userData = getUserData();
    const events = await getEventByUser(userData.id);
    ctx.render(profileTemplate(events, userData));
}