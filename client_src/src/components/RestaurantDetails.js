import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Canvas from './Canvas';

class RestaurantDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      details: '',
      starsTest: 1
    }
  }

  componentWillMount() {
    this.getRestaurant();
  }

  onDelete() {
    let restaurantId = this.state.details.id;
    axios.delete(`http://localhost:3000/api/restaurants/${restaurantId}`)
      .then(response => {
        this.props.history.push('/');
      }).catch(err => console.log(err));
  }

  getRestaurant() {
    let restaurantId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/restaurants/${restaurantId}`)
      .then(response => {
        this.setState({details: response.data, starsTest: response.data.stars}, () => {
          console.log(this.state);
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    let style = {
      width:120,
      height:120,
      display:"inline-block"
    }

    let numStars = this.state.details.stars;
    let numArray = [];

    for (let i = 0; i < numStars; i++) {
        numArray.push(<img src={require('../starClipart.svg')} style={style} alt="" key={i+400}/>
      )
    }

    console.log(this.state.starsTest);

    return (
      <div>
        <h1><a href={`https://www.google.com/maps/search/?api=1&query=${this.state.details.city}+${this.state.details.address}`} >{this.state.details.name}</a></h1>
        <div>
          {numArray}
        </div>
        <ul className="collection" >
          <li className="collection-item" >City: {this.state.details.city}</li>
          <li className="collection-item" >Address: {this.state.details.address}</li>
          <li className="collection-item" >Stars: {this.state.details.stars}</li>
          <li className="collection-item" >Starstest: {this.state.starsTest}</li>
        </ul>

        {/* <Canvas stars={2} /> */}
        <Canvas stars={this.state.starsTest} />
        {/* <Canvas stars={this.state.details.stars} /> */}

        <Link className="btn" to={`/restaurants/edit/${this.state.details.id}`}>Edit</Link>
        <button onClick={this.onDelete.bind(this)} className="btn red right">Delete</button>
      </div>
    )
  }

}

export default RestaurantDetails;
