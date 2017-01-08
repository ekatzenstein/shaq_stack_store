import React, { Component } from 'react';
import {Link} from 'react-router';
import axios from 'axios';

const testArr = [{title: 'test'}];
export default class Products extends Component {

  constructor() {
    super();
    this.state = {
      products: [],
      categories:['Clothes'],
      search:''
    };
    this._categoryChange = this._categoryChange.bind(this);
    this._searchProduct = this._searchProduct.bind(this);
  }
  componentDidMount() {
   //this.nextJoke()
   axios.get('/api/products')
   .then(res => res.data)
   .then( products => {
    this.setState({products: products});
   });

  }

  _categoryChange(e){
    this.setState({categories:[e.target.value]})
  }
  _searchProduct(e){
    this.setState({search:e.target.value.toLowerCase()})
  }


  render() {

    const products = this.state.products && this.state.products.filter(product=>{
      return product.category.filter(cat=>{
        return this.state.categories.indexOf(cat) !== -1
      }).length > 0 && `${product.title}-${product.description}`.toLowerCase().indexOf(this.state.search)!==-1;
    }).map(product => {
      return (
        <tr key={product.id}>

        <td> <Link to={`/products/${product.id}`}>{product.title}</Link> </td>
        <td> {product.category.join(', ')} </td>
        <td> {product.photo_url} </td>
        <td> {product.current_price} </td>
        <td> {product.description} </td>
        <td> {product.availability} </td>
        <td> {product.inventory} </td>

        </tr>
      )
    });
    return (
      <div >
        <input name="Search" onChange={this._searchProduct} />

        <select name="Categories" onChange={this._categoryChange}>
          <option value="Clothes">Clothes</option>
          <option value="Accessories">Accessories</option>
          <option value="Athletics">Athletics</option>
          <option value="Beauty">Beauty</option>
          <option value="Shoes">Shoes</option>
        </select>


        <h1>PRODUCTS</h1>
        <table>
          <tbody>
        <tr>
        <th> title </th>
        <th> category </th>
        <th> photo_url </th>
        <th> current_price </th>
        <th> description </th>
        <th> availability </th>
        <th> inventory </th>

        </tr>
        {
          products
        }
        </tbody>
        </table>
      </div>
    )
  }
}
