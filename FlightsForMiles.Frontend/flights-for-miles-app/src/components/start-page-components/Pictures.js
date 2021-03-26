import React from 'react'

import 'react-slideshow-image/dist/styles.css'
import { Fade } from 'react-slideshow-image';

const slideImages = [
    '../assets/images/photo1.jpg',
    '../assets/images/photo2.jpg',
    '../assets/images/photo3.jpg',
    '../assets/images/photo4.jpg'
];
/*
const items = [
    {
      src: '../assets/images/photo1.jpg',
      altText: '',
      caption: '',
      header: 'Where to next?',
      key: '1'
    },
    {
      src: '../assets/images/photo2.jpg',
      altText: '',
      caption: '',
      header: 'Maybe here?',
      key: '2'
    },
    {
      src: '../assets/images/photo3.jpg',
      altText: '',
      caption: '',
      header: 'Or here?',
      key: '3'
    },
    {
      src: '../assets/images/photo4.jpg',
      altText: '',
      caption: '',
      header: 'Find, book and enjoy the flight!',
      key: '4'
    }
  ];
*/
function Pictures() {
    return (
        <div style={{ margin: "5%", color: "black" }} className="slide-container">
            {/*<UncontrolledCarousel items={items} />*/}
            <Fade style={{color: "#c4c3e8"}}>
                <div className="each-fade">
                    <h2>Where to next?</h2>
                    <img src={slideImages[0]} alt="" />
                </div>
                <div className="each-fade">
                    <h2>Maybe here?</h2>
                    <img src={slideImages[1]} alt="" />
                </div>
                <div className="each-fade">
                    <h2>Or here?</h2>
                    <img src={slideImages[2]} alt="" />
                </div>
                <div className="each-fade">
                    <h2>Find, book and enjoy the flight!</h2>
                    <img src={slideImages[3]} alt="" />
                </div>
            </Fade>
        </div>
    )
}

export default Pictures

/**
 * import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const items = [
  {
    src: '../assets/images/photo1.jpg',
    altText: '',
    caption: '',
    header: 'Where to next?',
    key: '1'
  },
  {
    src: '../assets/images/photo2.jpg',
    altText: '',
    caption: '',
    header: 'Maybe here?',
    key: '2'
  },
  {
    src: '../assets/images/photo3.jpg',
    altText: '',
    caption: '',
    header: 'Or here?',
    key: '3'
  },
  {
    src: '../assets/images/photo4.jpg',
    altText: '',
    caption: '',
    header: 'Find, book and enjoy the flight!',
    key: '4'
  }
];

const Pictures = () => <div style={{margin: "5%", color:"black"}}><UncontrolledCarousel items={items} /></div>

export default Pictures;
 */