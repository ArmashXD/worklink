import request from '../request'
import { BASE_API } from '../Constant'



const baseUrl = `${BASE_API}service-tag`;


function all(params = {}) {
    return request({
        url: baseUrl,
        params
    });
}

function find(params = {}) {
    return request({
        url: `${baseUrl}/find`,
        params
    });
}

const ServiceTag = {
    all,find
};

export default ServiceTag