import R from 'ramda';
import request from 'superagent';

import {
    axiosRequest, 
    ACCESS_KEY,
    SEARCH_REQUEST, 
    API_URL
} from './data';

export const fetchImages = async() => {
    const {body} = await request.get(`${API_URL}${SEARCH_REQUEST}?client_id=${ACCESS_KEY}`)

    return body
}
