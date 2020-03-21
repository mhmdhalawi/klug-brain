import React, { Component } from 'react';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/imagelinkform';
import Rank from './components/Rank/rank';
import SignIn from './components/SignIn/signin';
import Register from './components/Register/register';
import FaceRecognition from './components/FaceRecognition/facerecognition';
import Particles from 'react-particles-js';
import './App.css';
import particleOptions from './particles';

const initialState = {
  input: '',
  imgUrl: '',
  box: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

  calculateFaceLocation = resp => {
    return resp.outputs[0].data.regions.map(face => {
      const clarifyFace = face.region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);

      return {
        leftCol: clarifyFace.left_col * width,
        topRow: clarifyFace.top_row * height,
        rightCol: width - clarifyFace.right_col * width,
        bottomRow: height - clarifyFace.bottom_row * height
      };
    });
  };

  displayFaceBox = box => {
    this.setState({ box: box });
  };
  onInputChange = e => this.setState({ input: e.target.value });

  onBtnSubmit = () => {
    this.setState({ imgUrl: this.state.input });
    fetch('https://boiling-lake-71154.herokuapp.com/imageurl', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(resp => {
        if (resp) {
          fetch('https://boiling-lake-71154.herokuapp.com/image', {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(resp => resp.json())
            .then(count => this.setState(Object.assign(this.state.user, { entries: count })))
            .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(resp));
      })
      .catch(err => console.log(err));
  };

  onRouteChange = route => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }

    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imgUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />

        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />

        {route === 'home' ? (
          <div>
            <Logo />
            <div className="main">
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onBtnSubmit={this.onBtnSubmit} />
              <FaceRecognition box={box} imgUrl={imgUrl} />
            </div>
          </div>
        ) : route === 'signin' || route === 'signout' ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
