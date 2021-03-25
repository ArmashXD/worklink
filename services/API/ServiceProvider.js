import request from '../request'
import { BASE_API } from '../Constant'

const baseUrl = `${BASE_API}service-provider`;

function all(params = {}) {
    return request({
        url: baseUrl,
        params
    });
}

function list(params = {}) {
    return request({
        url: `${baseUrl}/list`,
        params
    });
}

function listPaginate(page) {
    return request({
        url: `${baseUrl}/list?page=` + page,
    });
}

function save(data) {
    return request({
        url: baseUrl,
        data,
        method: 'POST',
    });
}

function update(id, data) {
    return request({
        url: `${baseUrl}/${id}`,
        data,
        method: 'PATCH',
    });
}

function get(id, params = {}) {
    return request({
        url: `${baseUrl}/show/${id}`,
        params,
    });
}

function destory(id) {
    return request({
        url: `${baseUrl}/${id}`,
        method: 'DELETE',
    });
}

function user(params = {}) {
    return request({
        url: `${baseUrl}/user`,
        params,
    });
}

function uploadImageUrl(serviceId, data) {
    return request({
        url: `${baseUrl}/upload/${serviceId}`,
        data,
        method: 'POST',
    });
}

function removeServiceImage(mediaId) {
    return request({
        url: `${baseUrl}/media/${mediaId}`,
        method: 'DELETE',
    });
}

function serviceImages(serviceId) {
    return request({
        url: `${baseUrl}/media/${serviceId}`,
        method: 'GET',
    });
}


function serviceFileList(serviceId) {
    return request({
        url: `${baseUrl}/file-list/${serviceId}`,
        method: 'GET',
    });
}

function getUrl(slug) {
    return `${baseUrl}/${slug}`;
}

const ServiceProvider = {
    all, save, list, get, user, uploadImageUrl, serviceImages, destory, serviceFileList, removeServiceImage
    , update, getUrl,listPaginate
};

export default ServiceProvider