import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import FaceReg from './Components/FaceReg/FaceReg';
import SignIn from './Components/Signin/SignIn';
import Register from './Components/Register/Register';
import './App.css';


const intialState ={
            imageUrl: "",
            input: " ",
            box: [],
            route: "signIn",
            link: false,
            user : {
              id: "",
              name: "",
              email: "",
              entries: 0,
              joined: ''
            }
}


export class App extends Component {
  constructor(){
    super()
    this.state= intialState;
      
  }

  loadUser =(data)=>{
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation=(data)=>{
    console.log(data)
        const image = document.getElementById("inputimage");
        const width = Number(image.width);
        const height = Number(image.height);
       const regions = data.outputs[0].data.regions;

       const boxes =regions.map(region => {
        
            const boundingBox = region.region_info.bounding_box;
            return{
              topRow: boundingBox.top_row*height,
              leftCol: boundingBox.left_col*width,
              bottomRow: height-(boundingBox.bottom_row*height),
              rightCol: width-(boundingBox.right_col*width)

            }

        
        });
        return boxes



  }

  displayFaceBox=(box)=>{
    this.setState({box:box})
  }


  onInputChange=(event)=>{
    this.setState({input:event.target.value})
  }

  onRouteChange=(route)=>{
    if(route === "signIn"){
      this.setState(intialState)
    } else if(route === 'home') {
      this.setState({link: true})
    }
    this.setState({route:route})
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
  
    fetch('https://node-js-d7td.onrender.com/api/clarifai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_app_id: {
          user_id: 'webdevcolm',
          app_id: 'test',
        },
        inputs: [
          {
            data: {
              image: {
                url: this.state.input,
              },
            },
          },
        ],
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data from Clarifai API');
        }
        return response.json();
      })
      .then((data) => {
        const faceLocation = this.calculateFaceLocation(data);
        this.displayFaceBox(faceLocation);
        return true; // Indicate success
      })
      .then((works) => {
        if (works) {
          return fetch('https://node-js-d7td.onrender.com/image', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          });
        }
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update entries count');
        }
        return response.json();
      })
      .then((count) => {
        this.setState(Object.assign(this.state.user, { entries: count}))
       })
      .catch((error) => {
        console.error('Error:', error);
        alert('Something went wrong! Please try again.');
      });
  };
  


  render() {
    return (
      <div className='App' >
        <ParticlesBg color ="#ffffff" type="cobweb" bg={true} />
        < Navigation onLinkTag={this.state.link} onRouteChange={this.onRouteChange}/>
        { this.state.route === "home"?
              <div>
                  < Logo/>
                    <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                    <ImageLinkForm 
                    onInputChange={this.onInputChange} 
                    onButtonSubmit={this.onButtonSubmit}/>
                    < FaceReg box = {this.state.box} imageUrl={this.state.imageUrl}/>
              
              </div>:
              (
                this.state.route === "signIn"?
                < SignIn loadUser ={this.loadUser} onRouteChange={this.onRouteChange}/>:
                < Register loadUser ={this.loadUser} onRouteChange={this.onRouteChange}/>
              )
        
        


        }
        
        


      </div>
    )
  }
}

export default App
