import request from '../request'
import {BASE_API} from '../Constant'

const baseApi = `${BASE_API}`;


function all(locale) {
    return request({
        url: `${baseApi}translations/${locale}`,
    });
}

const TranslationService = {
    all
};

export default TranslationService