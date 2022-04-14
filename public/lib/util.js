// Logger
function log(message) {
    $('#logs').val($('#logs').val() + "\n" + message);
    console.log(message)
}