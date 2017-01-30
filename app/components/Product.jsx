import React, {Component} from 'react';
import axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';
import {Link, browserHistory} from 'react-router';

import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Paper from 'material-ui/Paper';

import Subheader from './Subheader'

const testArr = [
    {
        title: 'test'
    }
];
export default class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {},
            userReviews: [],
            rating: 3,
            quantity: 1,
            submitted: false,
            reviewText: ''

        };
        this.addReview = this.addReview.bind(this);
        this.updateRating = this.updateRating.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.quantityChange = this.quantityChange.bind(this);
        this.checkOut = this.checkOut.bind(this);
        this.keepShopping = this.keepShopping.bind(this);
        this.ratingText = this.ratingText.bind(this);

    }
    static childContextTypes = {
        muiTheme: React.PropTypes.object
    }

    getChildContext()
    {
        return {muiTheme: getMuiTheme()}
    }

    componentDidMount() {
        axios.get(`/api/products/${this.props.params.productId}`).then(res => res.data).then(product => {
            console.log('product obj: ', product);
            this.setState({product: product});
        });

    }
    updateRating(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    ratingText(e) {
        this.setState({reviewText: e.target.value})
    }

    quantityChange(e) {
        console.log('changing quantity');
        this.setState({quantity: e.target.value});
    }

    checkOut(evt) {
        evt.preventDefault();
        browserHistory.push('/cart');
    }

    keepShopping(evt) {
        evt.preventDefault();
        browserHistory.push('/');
    }

    handleClick(evt) {

        evt.preventDefault();
        axios.post('/api/orders/cart/', {
            product_id: this.state.product.id,
            quantity: this.state.quantity
        }).then(res => {
            this.setState({submitted: true});
        }).catch(err => console.log(err));
    }

    addReview(evt) {
        let review_text = this.state.reviewText;
        review_text = review_text === ''
            ? 'no input text'
            : review_text;
        const rating = this.state.rating;
        const review = {
            rating,
            review_text,
            product_id: this.props.params.productId
        };
        axios.post(`/api/reviews`, review).then(res => res.data).then(userReview => {
            this.setState({
                userReviews: [
                    ...this.state.userReviews,
                    userReview
                ],
                reviewText: ''
            })

        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        const product = this.state.product;
        const reviews = this.state.product.reviews && this.state.userReviews.length > 0
            ? [
                ...this.state.product.reviews,
                ...this.state.userReviews
            ]
            : this.state.product.reviews;
        const productComponent = Object.keys(product).length > 0
            ? (
                <tr key={product.id}>
                    <td>
                        {product.title}
                    </td>
                    <td>
                        {product.category.join(', ')}
                    </td>
                    <td>
                        <img src={product.photo_url} width={"400px"}/>
                    </td>
                    <td>
                        {product.current_price}
                    </td>
                    <td>
                        {product.description}
                    </td>
                    <td>
                        {product.availability}
                    </td>
                    <td>
                        {product.inventory}
                    </td>
                    <td>{this.props.isAdmin
                            ? <Link to={`/products/${product.id}/edit`}>
                                    <button>Edit Product</button>
                                </Link>
                            : null}</td>
                </tr>
            )
            : null;

        const quantityInput = (<input type="number" name="quantity" value={this.state.quantity} onChange={this.quantityChange}/>);
        const buyButton = (
            <button onClick={this.handleClick}>Add to Cart</button>
        );
        const checkOutBtn = (
            <button onClick={this.checkOut}>Check Out</button>
        );
        const keepShoppingBtn = (
            <button onClick={this.keepShopping}>Keep Shopping</button>
        );
        return (
            <div style={{
                padding: '30px'
            }}>
                <div style={{
                    display: 'inline'
                }}>
                    <Card style={{
                        width: '500px',
                        float: 'left',
                        fontFamily: 'pacfont'
                    }}>
                        <CardMedia overlay={< CardTitle title = {
                            product.title
                        }
                        subtitle = {
                            product.description
                        } />}>
                            <img src={product.photo_url}/>
                        </CardMedia>
                        <CardTitle title="Available" subtitle={`$${product.current_price}`}/>
                        <CardActions>
                            <FlatButton style={{
                                fontFamily: 'pacfont'
                            }} label="Add to Cart" onClick={this.handleClick}/> {this.props.isAdmin
                                ? <FlatButton style={{
                                        fontFamily: 'pacfont'
                                    }} label="Edit Product" onClick={() => browserHistory.push(`/products/${product.id}/edit`)}/>
                                : null}
                        </CardActions>
                    </Card>
                </div>
                <div style={{
                    marginLeft: '530px'
                }}>

                    {this.state.product.reviews && reviews.map((review, i) => (
                        <Paper key={i} style={{padding: '5px',paddingLeft: '20px',marginBottom: '5px'}}>
                        <h5>{review.rating}/5</h5>
                        <StarRatingComponent name="prior product rating" editing={false} starCount={5} value={+review.rating} starColor={'black'} emptyStarColor={'lightgray'}/>
                            <br/>
                            <span>{review.updated_at}</span><br/>
                            <p>{review.review_text}</p>
                            <br/>
                        </Paper>
                    ))}
                    {
                        //the below should be a separate react component
                    }
                    {this.props.user != ''
                        ? <Paper style={{padding: '5px',paddingLeft: '20px',marginBottom: '5px'}}>
                                <br/>

                                <StarRatingComponent name="product rating" editing={true} starCount={5} value={this.state.rating} onStarClick={this.updateRating}/>
                                <br/>
                                <TextField hintText="what did you think?" onChange={this.ratingText} value={this.state.reviewText} style={{
                                    width: '90%'
                                }} multiLine={true}></TextField>
                                <br/>
                                <br/>
                                <RaisedButton onClick={this.addReview}>
                                    Add Review</RaisedButton>
                                <br/>
                                <br/>
                            </Paper>
                        : null}

                    <br/>
                </div>

            </div>
        )
    }
}
