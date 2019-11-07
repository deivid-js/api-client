const JWT_TOKEN_NAME = '@APP/token';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
    }
});

if (localStorage.getItem(JWT_TOKEN_NAME)) {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(JWT_TOKEN_NAME)}`;
}
