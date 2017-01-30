import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router';
import axios from 'axios';


import {GridList, GridTile} from 'material-ui/GridList';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from './Subheader';
import ShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';

import getMuiTheme from 'material-ui/styles/getMuiTheme'


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
};

export default class Products extends Component {

  constructor() {
    super();
    this.state = {
      products: [],
      categories:['All'],
      search:''
    };
    this._categoryChange = this._categoryChange.bind(this);
    this._searchProduct = this._searchProduct.bind(this);
    this.checkOut = this.checkOut.bind(this);
    this.handleClick=this.handleClick.bind(this);
  }
  componentDidMount() {
   //this.nextJoke()
   axios.get('/api/products')
   .then(res => res.data)
   .then( products => {
    this.setState({products: products});
   });

  }
  static childContextTypes =
    {
        muiTheme: React.PropTypes.object
    }

    getChildContext()
    {
        return {
            muiTheme: getMuiTheme()
        }
    }

  _categoryChange(e,index,value){
    this.setState({categories:[value]})
  }
  _searchProduct(e){
    this.setState({search:e.target.value.toLowerCase()})
  }

  checkOut(e){
    e.preventDefault();
    browserHistory.push('/cart');
  }

  handleClick(product) {
    console.log(product)
    console.log('buy product: ', product.id);
    const product_id =  product.id;
    axios.post('/api/orders/cart/', {
      product_id: product_id*1,
      quantity: 1
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(err=> console.log(err));
  }


  render() {
    const products =
      this.state.products &&
      this.state.products.filter( product=>
        {
          //filter by category
          const condition1 = product.category.filter(cat=>{
            return this.state.categories.indexOf(cat) !== -1
          }).length > 0 || this.state.categories.indexOf('All') != -1;


          //search name of product in title and description
          const condition2 = `${product.title}-${product.description}`.toLowerCase().indexOf(this.state.search)!==-1;

          return condition1 && condition2;
        })
      // .map(product =>
      // {
      //   return (
      //     <tr key={product.id}>
      //
      //     <td> <Link to={`/products/${product.id}`}>{product.title}</Link> </td>
      //     <td> {product.category.join(', ')} </td>
      //     <td> <img src={product.photo_url} width={"100px"}/></td>
      //     <td> {product.current_price} </td>
      //     <td> {product.description} </td>
      //     <td> {product.availability} </td>
      //     <td> {product.inventory} </td>
      //     <td><button id={`${product.id}`} onClick={this.handleClick}>Add to Cart</button></td>
      //     <td>{this.props.isAdmin ? <Link to={`products/${product.id}/edit`}><button>Edit Product</button></Link>:null}</td>
      //     </tr>
      //   )
      // });
    const pacStyle={fontFamily:'pacfont'};
    return (
      <div>
        <div className='container-fluid' style={{width:'80%', margin:'0 auto', lineHeight:'30px', overflow:'hidden'}}>

          <Subheader><span style={{marginRight:'30px'}}>products</span>
            <span>
              <TextField
              hintText="search"
              onChange={this._searchProduct}
              style={{padding:'0px', margin:'0px', width:'400px', marginRight:'20px', fontFamily:'pacfont'}}
            />
          <DropDownMenu value={this.state.categories[0]} onChange={this._categoryChange} style={{ top:'19.5px', left:'0px', marginLeft:'-19px', fontFamily:'pacfont'}}>
              <MenuItem value="All" primaryText="All" style={pacStyle}/>
              <MenuItem value="Clothes" primaryText="Clothes"  style={pacStyle}/>
              <MenuItem value="Accessories" primaryText="Accessories" style={pacStyle}/>
              <MenuItem value="Athletics" primaryText="Athletics" style={pacStyle}/>
              <MenuItem value="Beauty" primaryText="Beauty" style={pacStyle}/>
              <MenuItem value="Shoes" primaryText="Shoes" style={pacStyle}/>
          </DropDownMenu>
          </span>
          </Subheader>
    <GridList
      cellHeight={180}
      cols={3}
    >
      {products.map((tile) => {
        return(

        <GridTile
          key={tile.img}
          title={<Link to={`/products/${tile.id}`} style={{color:'white'}}>{tile.title}</Link>}
          subtitle={<span><b>{tile.description}</b></span>}
          actionIcon={<IconButton  id={`${tile.id}`}  onClick={()=>this.handleClick(tile)}><ShoppingCart color="white" /></IconButton>}


        >
          <img src={tile.photo_url} />
        </GridTile>
      )
    })}
    </GridList>
  </div>
      </div>

    )
  }
}
