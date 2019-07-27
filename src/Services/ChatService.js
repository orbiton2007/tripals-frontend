import HttpService from '../Services/HttpService'

export default {
    add,
    getChat,
    update
}


function add(newChat) {

    return HttpService.post(_getUrl(), newChat)
}

function getChat(id) {
    return HttpService.get(_getUrl(id))
}

function update(chat) {
    return HttpService.put(_getUrl(chat._id), chat)
}

function _getUrl(id = '') {
    return `chat/${id}`
}
