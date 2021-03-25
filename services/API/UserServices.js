import request from '../request'
import { BASE_API } from '../Constant'

const baseUrl = `${BASE_API}user`;


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

function uploadDp(data) {
    return request({
        url: `${baseUrl}/upload`,
        data,
        method: 'POST',
    });
}

function profile(id) {
    return request({
        url: `${baseUrl}/profile/${id}`,
    });
}

function serviceProvide(id) {
    return request({
        url: `${baseUrl}/service-provide/${id}`,
    });
}

const UserService = {
    all, detail, uploadDp, profile, serviceProvide
};

export default UserService