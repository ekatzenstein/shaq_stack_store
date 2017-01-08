import React, { Component } from 'react';
import axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';

const testArr = [{title: 'test'}];
export default class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {},
      reviews:[],
      review:'',
      rating:3

    };
    this.addReview=this.addReview.bind(this);
    this.updateRating=this.updateRating.bind(this);

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
  updateRating(nextValue, prevValue, name) {
      this.setState({rating: nextValue});
    }

  handleClick(evt) {
    console.log('clicked cart');
  }

  addReview(evt) {
    let review_text = document.getElementById('review').value;
    review_text = review_text==='' ? 'no input text' : review_text;
    const rating = this.state.rating;
    axios.post(`/api/reviews`,{rating, review_text, product_id:this.props.params.productId})
    .then(res=>res.data)
    .then(review=>{
      console.log(review)
    })
    .catch(err=>{console.log(err)})
  }



  render() {

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
        <button onClick={this.handleClick}>Add to Cart</button>
        {this.state.product.reviews && this.state.product.reviews.map((review,i)=>(
          <div key={i}><h3>{review.rating}/5</h3><span>{review.updated_at}</span><br/>
          <p>{review.review_text}</p>
          </div>
        ))}
        <StarRatingComponent
          name="product rating"
          editing={true}
          starCount={5}
          value={this.state.rating}
          onStarClick={this.updateRating}
        />
        <br/>
        <textarea id='review'></textarea>
        <br/>
        <button onClick={this.addReview}>

          Add Review</button>
        <br/>



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
