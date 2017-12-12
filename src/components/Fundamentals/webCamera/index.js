import React, {Component} from 'react';
import Webcam from 'react-webcam';

import styles from "./styles.css";
import classNames from "classnames/bind";
let cx = classNames.bind(styles);

import RegistDiverBanner from '~/src/components/RegistDiverBanner';

let FileSaver = require('file-saver');

class WebcamCapture extends Component {
    constructor(props){
        super(props);

        this.state = {
            showPic: false,
            imageSRC: '',
            fileName: ''
        }

        this.capture = this.capture.bind( this );
        this.setRef = this.setRef.bind( this );
    }

    componentWillMount(){
        let defaultFileName = window.location.search.substring(1).split('=')[1];
        this.setState({
            fileName: defaultFileName
        })
    }

    setRef = (webcam) => {
        this.webcam = webcam;
    }
    capture = () => {
        const imageSrc = this.webcam.getScreenshot();

        this.setState({ showPic: true, imageSRC: imageSrc });
    };
    setFileName = (e) => {
        this.setState({ fileName: e.target.value });
    }
    doSave = (e) => {
        // e.preventDefault();
        // let deepbluId = window.location.search.substring(1).split('=')[1];
        let fileName = this.state.fileName;
        let blob = new Blob([this.state.imageSRC], {type: "text/plain;charset=utf-8"});

        FileSaver.saveAs(blob, fileName);
    }

    render() {
        return (
            <div className={cx('container')}>
                <RegistDiverBanner diver="n"/>
                <div className={cx('basicwrapper')}>
                    <div horizontal className={cx('final')}>
                        <div>
                            <Webcam
                              audio={false}
                              width={cx('cameraW')}
                              ref={this.setRef}
                              screenshotFormat="image/jpeg"
                            />
                            <button onClick={ this.capture }>Capture photo</button>
                            <img className={ this.state.showPic ? cx('canvasShow') : cx('canvasHidden') } src={ this.state.imageSRC }/>

                            <form>
                                <input
                                    type="submit"
                                    value="save"
                                    onClick={ this.doSave }></input>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default WebcamCapture;
