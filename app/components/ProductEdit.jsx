import React, {Component} from 'react';
import {Link} from 'react-router';
import axios from 'axios';

import Product from './Product';
import ProductEditTable from './ProductEditTable';

export default class Admin extends Component {

    constructor() {
        super();
        this.state = {
            product: {}
        };
        this.valueUpdate = this.valueUpdate.bind(this)
        this.updateProduct = this.updateProduct.bind(this)
    }
    componentDidMount() {
        axios.get(`/api/admin/products/${this.props.routeParams.productId}`).then(res => res.data).then(product => {
            this.setState({product});
        });
    }
    valueUpdate(key, value) {
        //we'll want to refactor this for Redux
        const product = Object.assign({}, this.state.product)
        product[key] = value;
        this.setState({product})
    }
    updateProduct() {
        axios.put(`/api/admin/products/${this.props.routeParams.productId}`, this.state.product).then(res => {
            console.log(res)
        });
    }

    render() {
        return (
            <div>
                <ProductEditTable component={this.state.product} valueUpdate={this.valueUpdate}></ProductEditTable>
                <button onClick={this.updateProduct}>Save</button>
            </div>
        )
    }
}
