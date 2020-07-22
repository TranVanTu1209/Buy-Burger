import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-fcb99.firebaseio.com/'
});

export default instance;