// Get audio devices 
const speakerDevices = document.getElementById("speaker-devices");
const ringtoneDevices = document.getElementById("mic-devices");

async function getAudioDevices() {
    await navigator.mediaDevices.getUserMedia({
        audio: true
    });
    updateAllAudioDevices.bind(device);
}

function updateAllAudioDevices() {
    if (device) {
        updateDevices(speakerDevices, device.audio.speakerDevices.get());
        updateDevices(ringtoneDevices, device.audio.ringtoneDevices.get());
    }
}

function updateDevices(selectEl, selectedDevices) {
    selectEl.innerHTML = "";
    device.audio.availableOutputDevices.forEach(function (device, id) {
        var isActive = selectedDevices.size === 0 && id === "default";
        selectedDevices.forEach(function (device) {
            if (device.deviceId === id) {
                isActive = true;
            }
        });

        var option = document.createElement("option");
        option.text = device.label;
        option.setAttribute("data-id", id);
        if (isActive) {
            option.setAttribute("selected", "selected");
        }
        selectEl.appendChild(option);
    });
}