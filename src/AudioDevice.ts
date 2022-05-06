export default class AudioDevice {
    
    context: AudioContext = new AudioContext();
    analyser: AnalyserNode = this.context.createAnalyser();
    encoder: any = new TextEncoder();
    decoder: any = new TextDecoder("utf-8");
    nodes: {[x:string]: any} = {}
    out: AudioNode = this.context.createGain();

    constructor(){
            

    }

    // onconnect = (device:any) => {
    //     this.analyser.smoothingTimeConstant = device.constraints?.analyser?.smoothingTimeConstant ?? 0.2
    //     this.analyser.fftSize = device.constraints?.analyser?.fftSize ?? 256;
    //     this.analyser.minDecibels = device.constraints?.analyser?.minDecibels ?? -127;
    //     this.analyser.maxDecibels = device.constraints?.analyser?.maxDecibels ?? 0;
    //     console.log(device.constraints, this.analyser.fftSize)
    // }

    connect = () => {

        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {

            // For Pre-Recorded Data...
            // this.context.decodeAudioData(arrayBuffer, (data) => {

            //     var source = this.context.createBufferSource();
            //     source.buffer = data;
            //     var splitter = this.context.createChannelSplitter(2);
            //     source.connect(splitter);
            //     var merger = this.context.createChannelMerger(2);   
                
            //     // Reduce the volume of the left channel only
            //     var gainNode = this.context.createGain();
            //     gainNode.gain.setValueAtTime(0.5, this.context.currentTime);
            //     splitter.connect(gainNode, 0);

            //     // Connect the splitter back to the second input of the merger: we
            //     // effectively swap the channels, here, reversing the stereo image.
            //     gainNode.connect(merger, 0, 1);
            //     splitter.connect(merger, 1, 0);

            //     merger.connect(this.out);
            // })


    
            this.nodes.filter = this.context.createBiquadFilter();
            // filterNode.type = 'highpass';
            // filterNode.frequency.value = 7000;
      
            // this.out.gain.value = 1.0;  
      
            this.nodes.microphone = this.context.createMediaStreamSource(stream);
            this.nodes.microphone.connect(this.nodes.filter);
            this.nodes.filter.connect( this.nodes.analyser);
            // microphone.connect(gainNode);
            this.nodes.analyzer.connect(this.out);
            // this.nodes.out.connect(context.destination); // NOTE: Comment out to block microphone audio
      
            stream.addEventListener('ended', this.disconnect)
    
          })
          
        return true
    }
    
    disconnect = () => {
        // looping = false
        this.nodes.microphone.disconnect();
        this.nodes.gain.disconnect();
        this.nodes.filter.disconnect()
    }

    // ondisconnect = (device:any) => {
    //     console.log('Device disconnected', device)
    // }
    
    // onerror = console.error

    // ondata = (decoded:string)=> {
    //     let channelData = decoded.split(',').map(str => Number.parseFloat(str)) // Organize Decoder Output into a Float Array
    //     return channelData // Pass Array to DataTracks
    // }

}
