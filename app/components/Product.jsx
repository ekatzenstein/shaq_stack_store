import React, { Component } from 'react';
import axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';
import {Link, browserHistory} from 'react-router';

export default class Product extends Component {

  constructor(props) {
    super(props);

    this.state = {
      product: {},
      userReviews:[],
      rating:3,
      quantity: 1,
      submitted: false
    };

    this.addReview=this.addReview.bind(this);
    this.updateRating=this.updateRating.bind(this);
    this.handleClick=this.handleClick.bind(this);
    this.quantityChange=this.quantityChange.bind(this);
    this.checkOut=this.checkOut.bind(this);
    this.keepShopping=this.keepShopping.bind(this);
  }

  componentDidMount() {
    // This should be in a Redux action
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

  quantityChange(e){
    console.log('changing quantity');
    this.setState({quantity: e.target.value});
  }

  checkOut(evt){ // this is called 'evt' in some places, 'e' in others
    evt.preventDefault();
    browserHistory.push('/cart');
  }

  keepShopping(evt){
    evt.preventDefault();
    browserHistory.push('/');
  }

  handleClick(evt) {
    evt.preventDefault();
    console.log('clicked cart, product: ', this.state.product);
    axios.post('/api/orders/cart/', {
      product_id: this.state.product.id,
      quantity: this.state.quantity
    })
    .then(res => {
      console.log(res.data);
      this.setState({submitted: true});
    })
    .catch(err=> console.log(err));
  }

  addReview(evt) {
    let review_text = document.getElementById('review').value; // NO! you should never pull data directly from DOM in React
    // Add an event handler on the textarea, and store the data in local state

    review_text = review_text==='' ? 'no input text' : review_text;
    const rating = this.state.rating;
    const review ={rating, review_text, product_id:this.props.params.productId};

    axios.post(`/api/reviews`,review)
    .then(res=>res.data)
    .then(userReview=>{
      this.setState({userReviews:[...this.state.userReviews,userReview]})
    })
    .catch(err=>{console.log(err)})
  }



  render() {
    const product = this.state.product;

    const reviews = this.state.userReviews.length
      ? [...this.state.product.reviews, ...this.state.userReviews]
      : this.state.product.reviews;

    const productComponent = product.id && (
      <tr key={product.id}>
        <td> {product.title} </td>
        <td> {product.category.join(', ')} </td>
        <td> <img src={product.photo_url} width={"400px"}/> </td>
        <td> {product.current_price} </td>
        <td> {product.description} </td>
        <td> {product.availability} </td>
        <td> {product.inventory} </td>
        <td>{this.props.isAdmin ? <Link to={`/products/${product.id}/edit`}><button>Edit Product</button></Link>:null}</td>
      </tr>
    );

    // If there's no logic around these, just render them inline
    const quantityInput = (<input type="number" name="quantity" value={this.state.quantity} onChange={this.quantityChange} />);
    const buyButton = (<button onClick={this.handleClick}>Add to Cart</button>);
    const checkOutBtn = (<button onClick={this.checkOut}>Check Out</button>);
    const keepShoppingBtn = (<button onClick={this.keepShopping}>Keep Shopping</button>);

    console.log('product_url: ', product.photo_url);
    return (
      <div >
        <h1>PRODUCT</h1>
        <table>
          <tbody>
            <tr>
              <th> title </th>
              <th> category </th>
              <th> photo </th>
              <th> current_price </th>
              <th> description </th>
              <th> availability </th>
              <th> inventory </th>
            </tr>
            { productComponent }
          </tbody>
        </table>
        { quantityInput }
        { buyButton }
        <br />

        { this.state.submitted && checkOutBtn }
        <br />

        { this.state.submitted && keepShoppingBtn }

        {this.state.product.reviews && reviews.map((review,i)=>(
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
          Add Review
        </button>
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
