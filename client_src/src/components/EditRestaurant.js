import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class EditRestaurant extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      city: '',
      address: '',
      id: '',
      stars: ''
    }
  }

  componentWillMount() {
    this.getRestaurantDetails();
  }

  onSubmit(e) {
    const newRestaurant = {
      name: this.refs.name.value,
      city: this.refs.city.value,
      address: this.refs.address.value,
      stars: this.refs.stars.value
    }
    this.editRestaurant(newRestaurant);
    e.preventDefault();
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  editRestaurant(newRestaurant) {
    axios.request({
      method: 'put',
      url: `http://localhost:3000/api/restaurants/${this.state.id}`,
      data: newRestaurant
    }).then(response => {
      this.props.history.push('/');
    }).catch(err => console.log(err));
  }

  getRestaurantDetails() {
    let restaurantId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/restaurants/${restaurantId}`)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          city: response.data.city,
          address: response.data.address,
          stars: response.data.stars
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h1>Edit Restaurant</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input type="text" name="name" ref="name" value={this.state.name} onChange={this.handleInputChange.bind(this)} />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-field">
            <input type="text" name="city" ref="city" value={this.state.city} onChange={this.handleInputChange.bind(this)} />
            <label htmlFor="city">City</label>
          </div>
          <div className="input-field">
            <input type="text" name="address" ref="address" value={this.state.address} onChange={this.handleInputChange.bind(this)} />
            <label htmlFor="address">Address</label>
          </div>
          <div className="input-field">
            <input type="text" name="stars" ref="stars" value={this.state.stars} onChange={this.handleInputChange.bind(this)} />
            <label htmlFor="stars">Stars</label>
          </div>
          <input type="submit" value="Save" className="btn" />
        </form>
      </div>
    )
  }

}

export default EditRestaurant;
