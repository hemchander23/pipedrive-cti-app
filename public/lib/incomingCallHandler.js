        // HANDLE INCOMING CALL

        function handleIncomingCall(call) {
            log(`Incoming call from ${call.parameters.From}`);

            //show incoming call div and incoming phone number
            $('#reject-call').removeClass('invisible');
            $('#answer-call').removeClass('invisible');
            $('#caller-details').html(`<b>Incoming call from ${call.parameters.From}</b>`);

            //add event listeners for Accept, Reject, and Hangup buttons
            $('#answer-call').onclick = () => {
                call.accept();
            };

            $('#reject-call').onclick = () => {
                call.reject();
            };

            $('#reject-call').onclick = () => {
                call.disconnect();
            };

            // add event listener to call object
            call.on("cancel", () => {
                log('The call has been canceled.');
                resetDialState();
            });
            call.on("disconnect", () => {
                log('The call has been disconnected.');
                resetDialState();
            });
            call.on("reject", () => {
                log('The call has been rejected.');
                resetDialState();
            });
        }