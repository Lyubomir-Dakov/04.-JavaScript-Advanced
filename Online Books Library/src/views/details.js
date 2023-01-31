import { deleteBook, getAllBooks, getBookById, getLikesByBookId, getMyLikeByBookId, likeBook } from '../api/books.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js'

const detailsTemplate = (book, isOwner, onDelete, likes, showLikeButton, onLike) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">
            <!-- Edit/Delete buttons ( Only for creator of this book )  -->
            ${isOwner ? html`<a class="button" href="/edit/${book._id}">Edit</a>
            <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>` : ''}

            <!-- Bonus -->

            <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
            
            ${likeControlTemplate(showLikeButton, onLike)}

            <!-- ( for Guests and Users )  -->
            
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${likes}</span>
            </div>
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>
`;

const likeControlTemplate = (showLikeButton, onLike) => {
    if (showLikeButton) {
        return html`<a @click=${onLike} class="button" href="javascript:void(0)">Like</a>`
    } else {
        return null;
    }
}


export async function detailsView(ctx) {
    const userData = getUserData();

    // ZA BONUSA
    const [likes, hasLike] = await Promise.all([
        getLikesByBookId(ctx.params.id),
        userData ? getMyLikeByBookId(ctx.params.id, userData.id) : 0
    ])

    const book = await getBookById(ctx.params.id);
    
    // vzimame id-to na user-a koito e lognat v prilojenieto i go sravnqmave s id-to na knigata koqto sme otvorili
    const isOwner = userData?.id == book._ownerId;

    const showLikeButton = userData != null && isOwner == false && hasLike == false;
    
    ctx.render(detailsTemplate(book, isOwner, onDelete, likes, showLikeButton, onLike));

    async function onDelete() {
        const choise = confirm('Are you sure you want to delete this book?')
        if (choise) {
            await deleteBook(ctx.params.id);
            ctx.page.redirect('/home');
        }
    }

    async function onLike() {
        console.log('liked book')
        await likeBook(ctx.params.id);
        ctx.page.redirect('/books/' + ctx.params.id);
    }
}