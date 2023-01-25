import { deleteOffer, getOfferById, addApplication, getAppCountByOfferId, getNumberOfAppByOfferIdByUserId } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js'

const detailsTemplate = (offer, isOwner, onDelete, applications, showApplyButton, onApply) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${offer.imageUrl} alt="example1" />
        <p id="details-title">${offer.title}</p>
        <p id="details-category">
            Category: <span id="categories">${offer.category}</span>
        </p>
        <p id="details-salary">
            Salary: <span id="salary-number">${offer.salary}</span>
        </p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Description</h4>
                <span>${offer.description}</span>
            </div>
            <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${offer.requirements}</span>
            </div>
        </div>
        <p>Applications: <strong id="applications">${applications}</strong></p>

        <!--Edit and Delete are only for creator-->
        <div id="action-buttons">
            ${isOwner ? html`
            <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
            ` : ''}

            <!--Bonus - Only for logged-in users ( not authors )-->
            ${appControlTemplate(showApplyButton, onApply)}

        </div>
    </div>
</section>
`;

const appControlTemplate = (showApplyButton, onApply) => {
    if (showApplyButton) {
        // return html`<a @click=${onLike} class="button" href="javascript:void(0)">Like</a>`
        return html`<a @click=${onApply} href="javascript:void(0)" id="apply-btn">Apply</a>`
    } else {
        return null;
    }
}

export async function detailsView(ctx) {
    const userData = getUserData();
    const offer = await getOfferById(ctx.params.id);

    // BONUS    
    const [applications, hasApply] = await Promise.all([
        getAppCountByOfferId(ctx.params.id),
        userData ? getNumberOfAppByOfferIdByUserId(ctx.params.id, userData.id) : 0
    ])
    const isOwner = userData?.id == offer._ownerId;
    const showApplyButton = userData != null && isOwner == false && hasApply == false;

    ctx.render(detailsTemplate(offer, isOwner, onDelete, applications, showApplyButton, onApply));

    async function onDelete() {
        const choise = confirm('Are you sure you want to delete this offer?')
        if (choise) {
            await deleteOffer(ctx.params.id);
            ctx.page.redirect('/dashboard');
        }
    }

    async function onApply() {
        await addApplication(ctx.params.id);
        ctx.page.redirect('/details/' + ctx.params.id);
    }
}