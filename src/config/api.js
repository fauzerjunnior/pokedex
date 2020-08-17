import axios from 'axios';

const api = axios.create({
    baseURL: 'https://raw.githubusercontent.com/BrunnerLivio/PokemonDataGraber/master/output.json'
});

export default api;