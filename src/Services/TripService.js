import HttpService from './HttpService'

export default {
    query,
    getById,
    remove,
    save,
    handleUploadImage
}

function query(filter) {
    return HttpService.get(_getUrl(), filter)
}

function getById(id) {
    return HttpService.get(_getUrl(id))
}

function remove(trip) {
    return HttpService.delete(_getUrl(trip._id), trip)
}

function save(trip) {
    if (trip._id) {
        return HttpService.put(_getUrl(trip._id), trip)
    } else {
        return HttpService.post(_getUrl(), trip)
    }
}

async function handleUploadImage(file) {
    const form = new FormData();
    form.append("imgUpload", file);
    const URL = (process.env.NODE_ENV === 'production') ? `/upload/cloudinary` : `//localhost:3000/upload/cloudinary`;
    try {
        const res = await fetch(URL, {
            method: "POST",
            body: form
        })
        const result = await res.json()
        return result.url;
    } catch(err){
        throw err;
    }
}

function _getUrl(id = '') {
    return `trip/${id}`
}

