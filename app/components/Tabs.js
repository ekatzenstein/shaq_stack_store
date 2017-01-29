import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

import { Link,browserHistory } from 'react-router'

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import Gesture from 'material-ui/svg-icons/content/gesture';

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
class BottomNavigationExampleSimple extends Component {
  state = {
    selectedIndex: 0,
  };
  componentDidMount(){
    // this.setState({selectedIndex:this.props.index})
  }
  select = (route) =>{
    browserHistory.push(`/${route}`)
    this.setState({selectedIndex:1})
  }
  ;
  getIndex = ()=>{
    const path = window.location.pathname;

    if(path==='/products'){
      return 0
    }
    else if (path==='/cart'){
      return 1;
    }
  }


  render() {
    console.log(this.props)
    const index = this.getIndex();
    return (
      <Paper zDepth={3}>
        <BottomNavigation selectedIndex={index}>
          <div className='pull-right' width='500px'>
          <BottomNavigationItem
            label="Products"
            icon={<Gesture/>}
            onClick={() => this.select('products')}
          />
          <BottomNavigationItem
            label="Users"
            icon={<ShoppingCart/>}
            onClick={() => this.select('users')}
          />
          {
            this.props.admin &&
            <BottomNavigationItem
            label="Orders"
            icon={<ShoppingCart/>}
            onClick={() => this.select('orders')}
            />
          }
          {
            this.props.admin &&
            <BottomNavigationItem
              label="Cart"
              icon={<ShoppingCart/>}
              onClick={() => this.select('cart')}
            />
          }
          </div>



        </BottomNavigation>
      </Paper>
    );
  }
}

export default BottomNavigationExampleSimple;
