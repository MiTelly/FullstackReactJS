import React, { Component } from 'react';
import axios from 'axios';
import RestaurantItem from './RestaurantItem';

class Restaurants extends Component {
  constructor() {
    super();
    this.state = {
      restaurants: []
    }
  }

  componentWillMount() {
    this.getRestaurants();
  }

  getRestaurants() {
    axios.get('http://localhost:3000/api/restaurants')
      .then(response => {
        this.setState({restaurants: response.data}, () => {
        })
      })
      .catch(err => console.log(err));
  }

  render() {

    const restaurantsItem = this.state.restaurants.map((restaurant, i) => {
      return (
        <div>
          <RestaurantItem key={restaurant.id} item={restaurant} />
        </div>
      )
    })
    return (
        <div>
            <h1>Restaurants Main Page</h1>
            <ul className="collection" key="asdfasdlkj4">
              {restaurantsItem}
            </ul>
        </div>
    )
  }

}

export default Restaurants;
