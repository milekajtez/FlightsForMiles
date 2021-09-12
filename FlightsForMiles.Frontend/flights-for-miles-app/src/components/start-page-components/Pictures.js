import React from "react";

import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";

const slideImages = [
  "../assets/images/photo1.jpg",
  "../assets/images/photo2.jpg",
  "../assets/images/photo3.jpg",
  "../assets/images/photo4.jpg",
];

function Pictures() {
  return (
    <div style={{ margin: "1%", color: "black" }} className="slide-container">
      <Slide style={{ color: 'white' }} arrows={false}>
        <div className="each-fade">
          <h3>Where to next?</h3>
          <img src={slideImages[0]} alt="" width="70%" height="70%" />
        </div>
        <div className="each-fade">
          <h3>Maybe here?</h3>
          <img src={slideImages[1]} alt="" width="70%" height="70%" />
        </div>
        <div className="each-fade">
          <h3>Or here?</h3>
          <img src={slideImages[2]} alt="" width="70%" height="70%" />
        </div>
        <div className="each-fade">
          <h3>Find a book and enjoy the flight!</h3>
          <img src={slideImages[3]} alt="" width="70%" height="70%" />
        </div>
      </Slide>
    </div>
  );
}

export default Pictures;
