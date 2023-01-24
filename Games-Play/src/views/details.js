import { deleteGame, getGameById, addComment, loadAllCommentsForGame } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';


// template + funtion


const detailsTemplate = (game, isOwner, onDelete, isLoggedIn, allComments, onSubmit) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${game.imageUrl} />
            <h1>Bright</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>

        <p class="text">${game.summary}</p>

        <!-- Bonus ( for Guests and Users ) -->
        <div class="details-comments">
            <h2>Comments:</h2>
            <ul>
                <!-- list all comments for current game (If any) -->
                ${allComments.length == 0 ? 
                    html`<p class="no-comment">No comments.</p>` 
                    : allComments.map(comment => 
                    html`<li class="comment">
                            <p>Content: ${comment.comment}</p>
                        </li>`)}
                
            </ul>
            <!-- Display paragraph: If there are no games in the database -->
            <!-- <p class="no-comment">No comments.</p> -->
        </div>

        <!-- Edit/Delete buttons ( Only for creator of this game )  -->
        ${isOwner ? html`
        <div class="buttons">
            <a href="/edit/${game._id}" class="button">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
        </div>` : ''}

    </div>

    <!-- Bonus -->
    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
    ${isLoggedIn == true ? html`
    <article class="create-comment">
        <label>Add new comment:</label>
        <form @submit=${onSubmit} class="form">
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment">
        </form>
    </article>
    ` : ''}

</section>
`;

// const donationsControlTemplate = (showDonationButton, onDonations) => {
//     if (showDonationButton) {
//         return html`<a @click=${onDonations} href="javascript:void(0)" class="donate">Donate</a>`
//     } else {
//         return null;
//     }
// }


export async function detailsView(ctx) {
    console.log(ctx);
    const game = await getGameById(ctx.params.id);
    const userData = await getUserData();
    const isOwner = userData?.id == game._ownerId;
    const isLoggedIn = userData ? true : false
    const allComments = await loadAllCommentsForGame(ctx.params.id);

    ctx.render(detailsTemplate(game, isOwner, onDelete, isLoggedIn, allComments, onSubmit));


    async function onDelete() {
        const choise = confirm('Are you sure you want to delete this post?')
        if (choise) {
            await deleteGame(ctx.params.id);
            ctx.page.redirect('/');
        }
    }   

    async function onSubmit() {
        
        // await addComment(ctx.params.id, ctx.comment)
        // ctx.page.redirect('/details/' + ctx.params.id);
        }
    


    // async function onDonations() {
    //     console.log('make donation')
    //     await donate(ctx.params.id);
    //     ctx.page.redirect('/details/' + ctx.params.id);
    //     console.log(donations)
    // }
}