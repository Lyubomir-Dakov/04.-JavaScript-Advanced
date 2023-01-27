import { deleteEvent, getEventById, getLikesByEventId, getLikesByEventIdByUserId, addLike } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js'

const detailsTemplate = (ev, isOwner, onDelete, showLikeButton, likes, onLike) => html`
<section id="detailsPage">
    <div id="detailsBox">
        <div class="detailsInfo">
            <h1>Title: ${ev.title}</h1>
            <div>
                <img src=${ev.imageUrl} />
            </div>
        </div>

        <div class="details">
            <h3>Theater Description</h3>
            <p>${ev.description}</p>
            <h4>Date: ${ev.date}</h4>
            <h4>Author: ${ev.author}</h4>
            <div class="buttons">

                ${isOwner ? html`
                <a @click=${onDelete} class="btn-delete" href="javascript:void(0)">Delete</a>
                <a class="btn-edit" href="/edit/${ev._id}">Edit</a>
                ` : ''}

                ${likeControlTemplate(showLikeButton, onLike)}
                

            </div>
            <p class="likes">Likes: ${likes}</p>
        </div>
    </div>
</section>
`;

const likeControlTemplate = (showLikeButton, onLike) => {
    if (showLikeButton) {
        return html`<a @click=${onLike} class="btn-like" href="javascript:void(0)">Like</a>`
    } else {
        return null;
    }
}


export async function detailsView(ctx) {
    const userData = getUserData();

    // ZA BONUSA
    const [likes, hasLike] = await Promise.all([
        getLikesByEventId(ctx.params.id),
        userData ? getLikesByEventIdByUserId(ctx.params.id, userData.id) : 0
    ])

    const ev = await getEventById(ctx.params.id);
    const isOwner = userData?.id == ev._ownerId;

    const showLikeButton = userData != null && isOwner == false && hasLike == false;

    ctx.render(detailsTemplate(ev, isOwner, onDelete, showLikeButton, likes, onLike));

    async function onDelete() {
        const choise = confirm('Are you sure you want to delete this book?')
        if (choise) {
            await deleteEvent(ctx.params.id);
            ctx.page.redirect('/');
        }
    }

    async function onLike() {
        await addLike(ctx.params.id);
        ctx.page.redirect('/details/' + ctx.params.id);
    }
}