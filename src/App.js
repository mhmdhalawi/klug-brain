import React, { Component } from 'react';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/imagelinkform';
import Rank from './components/Rank/rank';
import FaceRecognition from './components/FaceRecognition/facerecognition';
import Particles from 'react-particles-js';
import './App.css';
import particleOptions from './particles';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '7e29daceb38b4c4c901caaf8414dd52d'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imgUrl: '',
      box: {}
    };
  }

  calculateFaceLocation = resp => {
    const result = resp.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: result.left_col * width,
      topRow: result.top_row * height,
      rightCol: width - result.right_col * width,
      bottomRow: height - result.bottom_row * height
    };
  };

  displayFaceBox = box => {
    console.log(box);
    this.setState({ box: box });
  };
  onInputChange = e => this.setState({ input: e.target.value });

  onBtnSubmit = () => {
    this.setState({ imgUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(resp =>
        this.displayFaceBox(this.calculateFaceLocation(resp)).catch(err => console.log(err))
      );
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation />
        <Logo />
        <div className="main">
          <Rank />
          <ImageLinkForm onInputChange={this.onInputChange} onBtnSubmit={this.onBtnSubmit} />
          <FaceRecognition box={this.state.box} imgUrl={this.state.imgUrl} />
        </div>
      </div>
    );
  }
}

export default App;
