import React, { Component } from 'react'
import {DataContext} from '../Context'
import {Link} from 'react-router-dom'
import Colors from './Colors'
import {FaTimes} from 'react-icons/fa';
import {FaPlus} from 'react-icons/fa';
import {FaMinus} from 'react-icons/fa';
import '../css/Details.css'
import '../css/Cart.css'

export class Cart extends Component {
    static contextType = DataContext;

    componentDidMount(){
        this.context.getTotal();
    }
    
    render() {
        const {cart, increase, reduction, removeProduct, total} = this.context;
        if(cart.length === 0){
            return <h2 style={{textAlign:"center", color: 'crimson'}}>No products in the cart</h2>
        }else{
            return (
                <>
                    {
                        cart.map(item =>(
                            <div className="details cart" key={item._id}>
                                <img className="details-product-img" src={item.src} alt=""/>
                                <div className="box">
                                    <div className="row">
                                        <h2>{item.title}</h2>
                                        <span>${item.price * item.count}</span>
                                    </div>
                                    <Colors colors={item.colors}/>
                                    <p>{item.description}</p>
                                    <p>{item.content}</p>
                                    <div className="amount">
                                        <button className="count" onClick={() => this.context.reduction(item._id)}>
                                            <FaMinus />
                                        </button>
                                        <span>{item.count}</span>
                                        <button className="count" onClick={() => this.context.increase(item._id)}>
                                            <FaPlus />
                                        </button>
                                    </div>
                                </div>
                                <div className="delete" onClick={() => removeProduct(item._id)}>
                                    <FaTimes />
                                </div>
                            </div>
                        ))
                    }
                    <div className="total">
                        <Link to="/payment">PROCEED TO CHECKOUT</Link>
                        <h3>Total: $ {total}</h3>
                    </div>
                </>
                )
            }
        }
}

export default Cart