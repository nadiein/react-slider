import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {fetchImages} from './../api'

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faChevronRight, faChevronLeft} from '@fortawesome/fontawesome-free-solid';

class Slider extends Component {
    state = {
        images: [],
        current: 0,
        lengthImages: 0,
        loaded: false
    }

    static propTypes = {
        images: PropTypes.shape({
            id: PropTypes.string,
            urls: PropTypes.array,
            width: PropTypes.number,
        })
    }

    componentDidMount() {
        fetchImages()
            .then(response => {
                this.setState({
                    images: response,
                    lengthImages: response.length,
                    loaded: true
                })
            })
    }

    nextSlide = () => {
        const {current, lengthImages} = this.state

        this.setState({
            current: current < lengthImages - 1 ? current + 1 : 0
        })
    }

    previousSlide = () => {
        const {current, lengthImages} = this.state

        this.setState({
            current: current > 0 ? current - 1 : lengthImages - 1
        })
    }

    renderDot = (dot, index) => {
        const {current} = this.state

        return (
            <div className={current === index ? 'dot active' : 'dot'} key={index} ></div>
        )
    }

    renderImage = (image, index) => {
        const {current} = this.state
        const translate = -(current * 100);

        return (
            <div className={current === index ? 'slide active' : 'slide'} style={{transform: `translateX(${translate}%)`}} key={index} ><img src={image.urls.regular} width={image.width} /></div>
        )
    }

    render() {
        const {images, loaded} = this.state
        const thumb = <div styles={{width: '100%', height: '480px', background: 'black'}}></div>

        return (
            <div className="d-flex flex-column">
                <div className="slider-cont">
                    <div className="d-flex flex-row flex-nowrap">
                        {!loaded ? thumb : images.map((image, index) => this.renderImage(image, index)
                        )}
                    </div>
                    <div className="controls">
                        <div onClick={this.previousSlide} className="arrow arrow-left">
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </div>
                        <div onClick={this.nextSlide} className="arrow arrow-right">
                            <FontAwesomeIcon icon={faChevronRight} />
                        </div>
                    </div>
                </div>
                <div className="dots-list-holder d-flex align-items-center justify-content-center">
                    {images.map((dot, index) => this.renderDot(dot, index))}
                </div>
            </div>
        );
    }
}

export default Slider;
