import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';

const API_KEY = '35892900-9e5e4336e30c7cc2bbc144cd3';

// const fetchPixabay = async (query, page) => {
//     const { data } = await axios.get(`${BASE_URL}?&q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
//     return data;
// }

//! Czy takie rozwiaznie jest lepsze? troche podejrzalem jak to inni robia i rzeczywiscie wyglada 
//! to duzo ladniej i czytelniej !!

export const fetchPixabay = async (query, page) => {
    try {
        const response = await axios.get(`${BASE_URL}`, {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'all',
                orientation: 'horizontal',
                page: page,
                per_page: 12,
                lang: 'en',
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export default fetchPixabay;