const baseURL = () => {
    if (window.location.href.includes('http://localhost:5173')) {
        return 'http://localhost:8000/api/';
    } else {
        return 'https://api.avidhilda.com/api/';   
    }
};

const headers = () => {
    const token = localStorage.getItem('token'); 

    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    }
};

const apiConfig = {
    baseURL: baseURL(),
    headers: headers()
};

export default apiConfig;
export { baseURL, headers };