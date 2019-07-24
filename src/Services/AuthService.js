import HttpService from './HttpService'

export default {
    login,
    signup,
    logout,
    getLoggedInUser,
}


function getLoggedInUser(){
    return JSON.parse(sessionStorage.getItem('loggedInUser'))
}

async function login(user) {
    const loggedInUser = await HttpService.post(_getUrl('login'), user)
    if(loggedInUser){
        sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        return loggedInUser;
    } else return Promise.reject('wrong password or username')
}

async function signup(userCredential) {
    const loggedInUser = await HttpService.post(_getUrl('signup'), userCredential)
    sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    return loggedInUser;
}


async function logout() {
    const result = await HttpService.post(_getUrl('logout'))
    sessionStorage.clear()
    return result;
}

function _getUrl(endpoint = '') {
    return `auth/${endpoint}`
}


