import AudioDevice from './AudioDevice'

const device = {

    // ----------------- Required Device Attributes -----------------
    label: 'audio', // Unique device name to reference

    // ----------------- Device Behavior -----------------

    device: AudioDevice, // Class with connect / disconnect methods (optional)
    onconnect: (device:any) => {

        device.device.analyser.smoothingTimeConstant = device.constraints?.analyser?.smoothingTimeConstant ?? 0.2
        device.device.analyser.fftSize = device.constraints?.analyser?.fftSize ?? 256;
        device.device.analyser.minDecibels = device.constraints?.analyser?.minDecibels ?? -127;
        device.device.analyser.maxDecibels = device.constraints?.analyser?.maxDecibels ?? 0;
        console.log(device.constraints, device.device.analyser.fftSize)

    }, // Connection Callback (optional)
    // ondisconnect, // Disconnection callback (optional)
    // encode, // Message encoder (optional, defaults to using a TextEncoder)
    // decode, // Message decoder (optional, defaults to using a TextDecoder)
    // ondata, // Callback to load decoded data into an array for DataTrack parsing (optional)
    // onerror, // Error callback (optional)

    // ----------------- Device Protocols -----------------

    // ----------------- Bluetooth -----------------
    // namePrefix: 'HEG', // Filter for specified name from Bluetooth results (required if device should be selectable with a loose constraint (e.g. {bluetooth: true}))
    // serviceUUID: '6e400001-b5a3-f393-e0a9-e50e24dcca9e',
    // characteristics: {
    //     transmit: '6e400003-b5a3-f393-e0a9-e50e24dcca9e',
    //     receive: '6e400002-b5a3-f393-e0a9-e50e24dcca9e',
    // }, 

    // ----------------- Serial / USB -----------------
    // usbVendorId: 4292,
    // usbProductId: 60000,
    // bufferSize: 1000,
    // baudRate: 115200,

    // ----------------- WebSocket / Wifi -----------------
    // url: 'https://localhost',

    protocols: [
        // 'serial', 
        // 'bluetooth', 
        // 'websocket'
    ]

}

export default device