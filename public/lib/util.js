// Send to logger panel
function log(message) {
    $('#logs').val($('#logs').val() + "\n" + message);
    console.log(message)
}

// Reset the dial buttons
function resetDialState() {
    $('#reject-call').addClass('invisible');
    $('#answer-call').addClass('invisible');
    $('#caller-details').addClass('invisible');
}