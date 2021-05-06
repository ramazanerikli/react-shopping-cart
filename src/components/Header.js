import React, { Component } from 'react';
import {FaTimes} from 'react-icons/fa';
import {FaShoppingCart} from 'react-icons/fa'
import {FaBars} from 'react-icons/fa';
import Logo from '../img/logo.png';
import {Link} from 'react-router-dom';
import {DataContext} from './Context'
import './css/Header.css'

export class Header extends Component {
    static contextType = DataContext;
    
    state = {
        toggle: false
    }

    menuToggle = () => {
        this.setState({toggle: !this.state.toggle})
    }

    render() {
        const {toggle} = this.state;
        const {cart} = this.context;
        return (
            <header>
                <div className="menu" onClick={this.menuToggle}>
                    <FaBars />
                </div>
                <div className="logo">
                    <h1><Link to="/"><img src={Logo} width="200" /></Link></h1>
                </div>
                <nav>
                    <ul className={toggle ? "toggle" : ""}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/product">Product</Link></li>
                        <li><Link to="/about">About</Link></li> 
                        <li className="close" onClick={this.menuToggle}>
                            <FaTimes />
                        </li>
                    </ul>
                </nav>
                <div className="nav-cart">
                        <span>{cart.length}</span>
                        <Link to="/cart">
                            <FaShoppingCart size="22" style={{ color: 'white' }}/>
                        </Link>
                </div>
            </header>
        )
    }
}

export default Header