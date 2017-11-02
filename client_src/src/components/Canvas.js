import React, { Component } from 'react';

class Canvas extends Component {

  constructor(props) {
    super(props);
    console.log(this.props);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    this.drawStar();
  }

  drawStar() {
    let base_image = new Image();
    base_image.onload = this.animate(base_image);
    base_image.src = require('../starClipart.svg');
  }

  animate(myImage) {
    var context = this.refs.myCanvas.getContext('2d');
    var star = {
      'x': 600,
      'y': 0,
      'width': 200,
      'height': 200
    };

    // switch needs work - issue with props being sent from parent
    // one star animates on canvas but not # stars that each restaurant was given

    switch(this.props.stars) {
      case 1:
        let animateID = setInterval( () => {
          context.clearRect(0, 0, 800, 200);
          context.drawImage(myImage, star.x, star.y, star.width, star.height);

          if (star.x === 0) {
            clearInterval(animateID);
          }
          star.x -= 100;

        }, 300);
        break;

      case 2:
       let animateID2 = setInterval( () => {
          context.clearRect(0, 0, 800, 200);
          context.drawImage(myImage, star.x, star.y, star.width, star.height);

          if (star.x === 200) {
            clearInterval(animateID2);
          }
          star.x -= 100;

        }, 300);
        break;

      default:
        break;
    }
  }

  render() {
    let style = {
      backgroundColor:"green"
    };

    return (
      <div>
        <canvas ref="myCanvas" style={style} width="800" height="200">Canvas</canvas>
        <h1>{this.props.stars}</h1>
      </div>
    )
  }

}

export default Canvas;
