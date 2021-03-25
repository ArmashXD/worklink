import request from '../request'
import { BASE_API } from '../Constant'



const baseUrl = `${BASE_API}notification`;

function send(service_id, data) {
    return request({
        url: `${baseUrl}/send/${service_id}`,
        data,
        method: 'POST',
    });
}


function userMessage(userId, data) {
    return request({
        url: `${baseUrl}/user-message/${userId}`,
        data,
        method: 'POST',
    });
}


function getCount(params = {}) {
    return request({
        url: `${baseUrl}/count`,
        params
    });
}

function getNotifications(params = {}) {
    return request({
        url: `${baseUrl}/user/unread`,
        params
    });
}

function markAsRead(message_id, data) {
    return request({
        url: `${baseUrl}/mark-read/${message_id}`,
        data,
        method: 'POST',
    });
}

function list(params = {}) {
    return request({
        url: `${baseUrl}/list`,
        params
    });
}

function conversation(user_id, params = {}) {
    return request({
        url: `${baseUrl}/conversation/${user_id}`,
        params
    });
}

const NotificationService = {
    send, getCount, getNotifications, markAsRead, list, conversation, userMessage
};

export default NotificationService