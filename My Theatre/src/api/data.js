import { del, get, post, put } from './api.js';


export async function getAllEvents() {
    return get('/data/theaters?sortBy=_createdOn%20desc&distinct=title');
}

export async function createEvent(ev) {
    return post('/data/theaters', ev);
}

export async function getEventById(id) {
     return get('/data/theaters/' + id)
}

export async function deleteEvent(id) {
    return del('/data/theaters/' + id);
}

export async function editEvent(id, ev) {
    return put('/data/theaters/' + id, ev)
}

export async function getEventByUser(userId) {
    return get(`/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}


// // BONUS

export async function addLike(eventId) {
    return post('/data/likes', {eventId})
}

export async function getLikesByEventId(eventId) {
    return get(`/data/likes?where=theaterId%3D%22${eventId}%22&distinct=_ownerId&count`)
}

export async function getLikesByEventIdByUserId(eventId, userId) {
    // return get(`/data/likes?where=theaterId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
    return get(`/data/likes?where=theaterId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}

window.addLike = addLike;
window.getLikesByEventId = getLikesByEventId;
window.getLikesByEventIdByUserId = getLikesByEventIdByUserId;


