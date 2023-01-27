import { getEventById, editEvent } from "../api/data.js";
import { html } from "../lib.js";

const editTemplate = (ev, onSubmit) => html`
<section id="editPage">
    <form @submit=${onSubmit} class="theater-form">
        <h1>Edit Theater</h1>
        <div>
            <label for="title">Title:</label>
            <input id="title" name="title" type="text" placeholder="Theater name" value=${ev.title}>
        </div>
        <div>
            <label for="date">Date:</label>
            <input id="date" name="date" type="text" placeholder="Month Day, Year" value=${ev.date}>
        </div>
        <div>
            <label for="author">Author:</label>
            <input id="author" name="author" type="text" placeholder="Author" value=${ev.author}>
        </div>
        <div>
            <label for="description">Theater Description:</label>
            <textarea id="description" name="description" placeholder="Description">${ev.description}</textarea>
        </div>
        <div>
            <label for="imageUrl">Image url:</label>
            <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" value=${ev.imageUrl}>
        </div>
        <button class="btn" type="submit">Submit</button>
    </form>
</section>
`

export async function editView(ctx) {
    const ev = await getEventById(ctx.params.id);

    ctx.render(editTemplate(ev, onSubmit))

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        // sabira dannite ot knigata
        const ev = {
            title: formData.get('title'),
            date: formData.get('date'),
            author: formData.get('author'),
            description: formData.get('description'),
            imageUrl: formData.get('imageUrl')
        }

        // pravi validaciqta
        if (ev.title == '' || ev.date == '' || ev.author == '' || ev.description == '' || ev.imageUrl == '') {
            return alert('All fields are required!');
        }

        await editEvent(ctx.params.id, ev);
        event.target.reset(); // za da izchisti fomata
        ctx.page.redirect('/details/' + ctx.params.id);
    }
}