import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Restaurants from './Restaurants';
import About from './About';
import RestaurantDetails from './RestaurantDetails';
import AddRestaurant from './AddRestaurant';
import EditRestaurant from './EditRestaurant';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Restaurants} />
            <Route exact path='/about' component={About} />
            <Route exact path='/restaurants/add' component={AddRestaurant} />
            <Route exact path='/restaurants/edit/:id' component={EditRestaurant} />
            <Route exact path='/restaurants/:id' component={RestaurantDetails} />
        </Switch>
    </main>

)

export default Main;
