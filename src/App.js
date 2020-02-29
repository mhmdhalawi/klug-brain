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
      imgUrl: ''
    };
  }

  onInputChange = e => this.setState({ input: e.target.value });

  onBtnSubmit = () => {
    this.setState({ imgUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err) {
        // there was an error
      }
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
          <FaceRecognition imgUrl={this.state.imgUrl} />
        </div>
      </div>
    );
  }
}

export default App;
