        // HANDLE INCOMING CALL

        function handleIncomingCall(call) {
            log(`Incoming call from ${call.parameters.From}`);

            //show incoming call div and incoming phone number
            incomingCallDiv.classList.remove("hide");
            incomingPhoneNumberEl.innerHTML = call.parameters.From;

            //add event listeners for Accept, Reject, and Hangup buttons
            incomingCallAcceptButton.onclick = () => {
                acceptIncomingCall(call);
            };

            incomingCallRejectButton.onclick = () => {
                rejectIncomingCall(call);
            };

            incomingCallHangupButton.onclick = () => {
                hangupIncomingCall(call);
            };

            // add event listener to call object
            call.on("cancel", handleDisconnectedIncomingCall);
            call.on("disconnect", handleDisconnectedIncomingCall);
            call.on("reject", handleDisconnectedIncomingCall);
        }