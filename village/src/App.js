import React, { Component } from 'react';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

import axios from 'axios';
import {Route, NavLink} from 'react-router-dom';

class App extends Component {
    //Initializes the state
  constructor(props) {
    //Calls Parent Class Constructor
    super(props);
    //Shoes the rendered values on the screen
    this.state = {
      smurfs: [],
    };
  }
    //Components that are created to insert themselves in the DOM
  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs')
      .then(response => {
        this.setState(() => ({ smurfs: response.data }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }
    //This is the action to allow the smurf to be added
  addSmurf = smurf => {
    console.log(smurf)
    axios
      .post('http://localhost:3333/smurfs', smurf)
      .then(res => {
        //Added person renders in real time
        this.setState({ smurfs: res.data })

        // this.props.history.push('/') // Returns to the home page after submitting the new friend...
        }) 

      .catch(err => console.log(err))
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    console.log(this.state)
    return (
      <div className="App">
        <nav>
          <NavLink to={'/'} exact>
            home
          </NavLink>
          <NavLink to={'/Smurfform'}>
            Add a smurf
          </NavLink>
        </nav>

        <Route
          exact path='/'
          render={props => <Smurfs {...props}
          smurfs={this.state.smurfs}
        />}/>
        
        <Route 
          path='/SmurfForm'
          render={props => <SmurfForm {...props}
          addSmurf={this.addSmurf}
        />}/>
      </div>
    );
  }
}

export default App;
