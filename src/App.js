import React, { useState, Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkform from './components/ImageLinkform/ImageLinkform';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ParticlesBg from 'particles-bg';



const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn : false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {

    constructor() {
        super();
        this.state = {
          input: '',
          imageUrl: '',
          box: {},
          route: 'signin',
          isSignedIn : false,
          user: {
            id: '',
            name: '',
            email: '',
            entries: 0,
            joined: ''
          }

        }
    }

    loadUser = (data) => {
        this.setState( {user: {
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined
      }})
    }

    // componentDidMount() {
    //   fetch("http://localhost:3002/").then(response.json()).then(console.log)
    // }



   caculateFaceLocation = (data) => {
      if (data && data.outputs && data.outputs.length > 0 && data.outputs[0].data && data.outputs[0].data.regions && data.outputs[0].data.regions.length > 0) {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
          const image = document.getElementById('inputimage');
          const width = Number(image.width);
          const height = Number(image.height);
          return {
              bottomRow : height - (height * clarifaiFace.bottom_row),
              leftCol : width * clarifaiFace.left_col,
              rightCol: width - (width * clarifaiFace.right_col),
              topRow : height * clarifaiFace.top_row      
          }
      } else {
        console.log('No face detected.');
        return data ;
    }
        

   }

    displayFaceBox = (box)=> {
    this.setState({box: box});
  }


    onInputChange = (e)=> {
     this.setState({input: e.target.value})
    }


    onButtonSubmit = ()=>{

    this.setState({imageUrl: this.state.input});

      fetch('http://localhost:3000/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            input: this.state.input 
        })
      })
      .then(response => response.json())
       .then(response=> {
        console.log('hi', response)
            if (response) {
                fetch('http://localhost:3000/image', {
                  method: 'put',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                      id: this.state.user.id 
                  })
                })
                .then(res => res.json())
                .then(count => {
                  this.setState(Object.assign(this.state.user, {entries: count}))
                })
                .catch(console.log)
            }
            this.displayFaceBox(this.caculateFaceLocation(response))    
       })
       .catch(err => console.log(err));
    }

    onRouteChange = (route) => {
        if (route === 'signout') {
          this.setState(initialState)
        } else if (route === 'home') {
          this.setState({isSignedIn: true})
        }
       this.setState({route: route });
    }

    render() {
        const {isSignedIn, imageUrl, route, box } = this.state;
        return (
          <div className="App">
              <ParticlesBg type="circle" bg={true} />

              <Navigation isSignedIn={isSignedIn} onRouteChange= {this.onRouteChange} />
              { route === 'home' 
              ? <div>
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries} />
                <ImageLinkform 
                  onInputChange={this.onInputChange} 
                  onButtonSubmit={this.onButtonSubmit} 
                />
                <FaceRecognition box= {box} imageUrl={imageUrl} /> 
              </div>  
              : (
                route === 'signin'
                ? <Signin onRouteChange= {this.onRouteChange} loadUser={this.loadUser} />
                : <Register onRouteChange= {this.onRouteChange} loadUser={this.loadUser}/>
              )
              
              }
          </div>
        );
      }
}



export default App;
