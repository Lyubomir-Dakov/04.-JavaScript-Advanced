import { getBookByUser } from '../api/books.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const profileTemplate = (books, userData) => html`

`

const bookCard = (book) => html`

`

export async function profileView(ctx) {
    const userData = getUserData();
    const books = await getBookByUser(userData.id);
    ctx.render(profileTemplate(books, userData));
}