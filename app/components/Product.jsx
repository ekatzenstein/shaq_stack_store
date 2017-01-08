import React, { Component } from 'react';
import axios from 'axios';

const testArr = [{title: 'test'}];
export default class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {},
      reviews:[],
      review:''

    };
    this.addReview=this.addReview.bind(this);

  }

  componentDidMount() {
   //this.nextJoke()
  //  axios.get(`/api/reviews/${this.props.params.productId}`)
  //  .then(res => {
  //    console.log('')
  //    console.log(res.data)
  //    console.log('')
  //    return res.data})
  //  .then( review => {
  //   this.setState({reviews:[review]})
  // }).catch((error)=>{console.log(error)});

  //  console.log('getting product details');
   axios.get(`/api/products/${this.props.params.productId}`)
   .then(res => res.data)
   .then( product => {
    console.log('product obj: ', product);
    this.setState({product: product});
   });

  }

  handleClick(evt) {
    console.log('clicked cart');
  }

  addReview(evt) {
    const review_text = document.getElementById('review').value;
    const rating = document.getElementById('rating').value;
    axios.post(`/api/reviews`,{rating, review_text, product_id:this.props.params.productId})
    .then(res=>res.data)
    .then(review=>{
      console.log(review)
    })
    .catch(err=>{console.log(err)})
  }



  render() {
    {console.log(this)}
    //const product = this.state.product;

    const product = this.state.product;

    const productComponent = Object.keys(product).length>0 ?
      (
      <tr key={product.id}>
      <td> {product.title} </td>
      <td> {product.category.join(', ')} </td>
      <td> {product.photo_url} </td>
      <td> {product.current_price} </td>
      <td> {product.description} </td>
      <td> {product.availability} </td>
      <td> {product.inventory} </td>
      </tr>
      ) :
      null;

    console.log('product: ',product);
    return (
      <div >
        <h1>PRODUCT</h1>
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
          productComponent
        }

        </tbody>

        </table>
        {this.state.product.reviews && this.state.product.reviews.map((review,i)=>(
          <div key={i}><h3>{review.rating}/5</h3><span>{review.updated_at}</span><br/>
          <p>{review.review_text}</p>
          </div>
        ))}
        <textarea id='review'></textarea>
          <select name="Rating" id='rating'>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
        <button onClick={this.addReview}>

          Add Review</button>
        <br/>

        <button onClick={this.handleClick}>Add to Cart</button>

      </div>
    )
  }
}


// const product = this.props.product && (() => {
//   return (
//     <tr key={product.id}>
//     <td> {product.title} </td>
//     <td> {product.category.join(', ')} </td>
//     <td> {product.photo_url} </td>
//     <td> {product.current_price} </td>
//     <td> {product.description} </td>
//     <td> {product.availability} </td>
//     <td> {product.inventory} </td>
//     </tr>
//   )
// });
