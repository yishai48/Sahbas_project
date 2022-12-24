

export default function useToken() {
    return {
        saveToken,
        getToken
    }
}

function saveToken(userToken) {
    localStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
    const token = localStorage.getItem('token');
    if (token) {
        const userToken = JSON.parse(token);
        const expiresDate = new Date(userToken.expires);        
        if (expiresDate < new Date()) {
            return ""
        }
        return userToken.token;
    }
    return "";
}