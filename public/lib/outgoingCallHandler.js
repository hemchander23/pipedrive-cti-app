document.getElementById("make-call").addEventListener("click", makeOutgoingCall);


async function makeOutgoingCall() {
    const callNum = document.getElementById("phone-number").value;

    var params = {
        // get the phone number to call from the DOM
        To: callNum
    };

    if (device) {
        log(`Attempting to call ${params.To} ...`);

        // Twilio.Device.connect() returns a Call object
        const call = await device.connect({
            params
        });

        // add listeners to the Call
        // "accepted" means the call has finished connecting and the state is now "open"
        call.on("accept", updateUIAcceptedOutgoingCall);
        call.on("disconnect", updateUIDisconnectedOutgoingCall);
        call.on("cancel", updateUIDisconnectedOutgoingCall);

        outgoingCallHangupButton.onclick = () => {
            log("Hanging up ...");
            call.disconnect();
        };

    } else {
        log("Unable to make call.");
    }
}