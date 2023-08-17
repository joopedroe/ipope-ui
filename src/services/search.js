
import axios from './axios';

const pathUrl = '/admin/v1/ipope';
export const getListSearches = async () => {
    const path = `${pathUrl}/searches`;
    return await axios.get(path);
};

export const createSearch = async (params) => {
    const path = `${pathUrl}/searches`;
    return await axios.post(path, params);
};

export const getSearchById = async (id) => {
    const path = `${pathUrl}/searches/${id}`;
    return await axios.get(path);
};

export const getSearchByCode = async (code) => {
    const path = `${pathUrl}/searches/code/${code}`;
    return await axios.get(path);
};
