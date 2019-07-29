//define the time format
function getTime() {
    let now = new Date();
    return now.toUTCString();
}

function doLog(line, level = 'Debug') {
    // TODO report to some extrnal logger
    console.log(`${getTime()} - ${level} - ${line}`)
}

export default {
    debug(line) {
        doLog(line, "Debug")
    },
    info(line) {
        doLog(line, "Info")
    },
    warn(line) {
        doLog(line, "Warn")
    },
    error(line) {
        doLog(line, "Error")
    }
}