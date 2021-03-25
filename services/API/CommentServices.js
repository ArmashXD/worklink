import request from '../request'
import { BASE_API } from '../Constant'

const baseUrl = `${BASE_API}comment`;

function all(params = {}) {
    return request({
        url: baseUrl,
        params
    });
}

function detail(params = {}) {
    return request({
        url: `${baseUrl}/details`,
        params
    });
}

function edit(comment_id, data) {
    return request({
        url: `${baseUrl}/${comment_id}`,
        data,
        method: 'patch',
    });
}

function save(service_id, data) {
    return request({
        url: `${baseUrl}/save/${service_id}`,
        data,
        method: 'POST',
    });
}

function destory(comment_id) {
    return request({
        url: `${baseUrl}/${comment_id}`,
        method: 'DELETE',
    });
}

function getProviderComments($id, params = {}) {
    return request({
        url: `${baseUrl}/service-provider/${$id}`,
        params
    });
}

const CommentServices = {
    all, save, getProviderComments, edit, destory
};

export default CommentServices