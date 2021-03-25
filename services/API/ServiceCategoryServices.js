import request from '../request'
import { BASE_API } from '../Constant'



const baseUrl = `${BASE_API}services-categories`;


function all(params = {}) {
    return request({
        url: baseUrl,
        params
    });
}


function services(params) {
    return request({
        url: `${baseUrl}/services`,
        params
    });
}

const ServiceCategory = {
    all, services
};

export default ServiceCategory