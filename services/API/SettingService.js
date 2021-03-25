import request from '../request'
import { BASE_API } from '../Constant'

const baseUrl = `${BASE_API}setting`;


function all(params = {}) {
    return request({
        url: baseUrl,
        params
    });
}

const ServiceProvider = {
    all,
};

export default ServiceProvider