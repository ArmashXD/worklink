import request from '../request'
import {BASE_API} from '../Constant'


const baseUrl = `${BASE_API}service-provider-rating`;


function create(data = {}) {
    return request({
        url: baseUrl,
        method: 'POST',
        data
    });
}

const ServiceProviderRating = {
    create
};

export default ServiceProviderRating