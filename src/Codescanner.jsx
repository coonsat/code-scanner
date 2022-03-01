import { Component, createElement } from "react";
import { BrowserMultiFormatReader, BrowserQRCodeReader } from '@zxing/library';

import { HelloWorldSample } from "./components/HelloWorldSample";
import "./ui/Codescanner.css";

export default class Codescanner extends Component {

    constructor(props) {
        super(props);
        this.setBarcode = this.setBarcode.bind(this);
        this.triggerMicroflow = this.triggerMicroflow.bind(this);
    }

    setBarcode(newBarcode) {
        const { barcode } = this.props;
        barcode.setValue(newBarcode);
    }

    triggerMicroflow() {
        const { codeAction } = this.props;
        codeAction.execute();
    }

    componentDidMount() {
        const wrapper = document.getElementsByClassName('codescanner')[0];
        if (wrapper != null) {
            const wrapperWidth = wrapper.offsetWidth;

            const video = document.createElement('video');
            video.id = 'video';

            const centralLine = document.createElement('div');
            centralLine.id = 'central-line';
            centralLine.style.height = wrapperWidth/2 + 'px';

            wrapper.appendChild(video);
            wrapper.appendChild(centralLine);

            const codeReader = new BrowserMultiFormatReader();

            Array.from(document.getElementsByClassName('close'))
                .forEach(element => {
                    element.addEventListener('click', () => {
                        codeReader.reset();
                    })
                }   
            )

            const firstDevice = codeReader
                .listVideoInputDevices()
                    .then(devices => {
                        const somedevice = devices[0];
                        codeReader
                            .decodeOnceFromVideoDevice(somedevice.id, 'video')
                            .then(result => {
                                this.setBarcode(result.toString());
                                codeReader.reset();
                                this.triggerMicroflow();
                            }) 
                            .catch(err => console.error(err));
                    });

            }
    }

    render() {

        return null;
    }
}
