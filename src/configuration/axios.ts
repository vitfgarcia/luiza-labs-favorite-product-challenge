import axios from 'axios';
import { Message } from '../helper';

axios.interceptors.response.use(
    (response) => response,
    (err) => {
        if (err.response.data) {
            throw new Message(err.response.data).withStatus(err.response.status);
        }

        throw err;
    },
);
