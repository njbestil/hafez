
import axios from './axios';

class Hafez {
    static getHafez = () => {
        return axios.get(`hafez/getHafez`);
    }

    static getHafezRandom = (num) => {
        return axios.get(`hafez/getHafezRandom/${num}`);
    }

    static getHafezById = (id) => {
        return axios.get(`hafez/getHafez/${id}`);
    }
}

export default Hafez;