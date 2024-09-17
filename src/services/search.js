
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

export const updateSearchSections = async (id, params) => {
    const path = `${pathUrl}/searches/${id}`;
    return await axios.put(path, params);
};

export const deleteSearchById = async (id) => {
    const path = `${pathUrl}/searches/${id}`;
    return await axios.delete(path);
};

export const getResultField = async (search_id,response_id ) => {
    const path = `${pathUrl}/searches/${search_id}/responses/${response_id}`;
    return await axios.get(path);
}

export const getResultFieldMaps = async (search_id,response_id ) => {
    const path = `${pathUrl}/searches/${search_id}/responses/${response_id}/details`;
    return await axios.get(path);
}

export const duplicateSearchById = async (search_id ) => {
    const path = `${pathUrl}/searches/${search_id}/duplicate`;
    return await axios.post(path);
}
