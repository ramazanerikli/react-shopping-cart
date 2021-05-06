import React, { Component } from 'react';

export const DataContext = React.createContext();

export class DataProvider extends Component {
    
    state = {
        products: [
            {
                "_id": "1",
                "title": "Rockrider XC 900",
                "src": "https://contents.mediadecathlon.com/p1863845/k$335de7abe4db4c78ddf5d92e604935dc/sq/rower-gorski-mtb-st-530-275.jpg?format=auto&f=1296x1296",
                "description": "Push your limits and improve your performance.",
                "content": "The XC 900 has a carbon seatpost with a diameter of 27.2 mm, which thanks to its work helps to suppress small unevenness. The whole is complemented by Sram Level T brakes with 160 mm rotors and Hutchinson Skeleton TR 29 x 2.1 ″ tires.",
                "price": 1320,
                "colors": ["orange", "lightgreen", "lightblue", "black"],
                "count": 1
            },
            {
                "_id": "2",
                "title": "Rockrider XC 900",
                "src": "https://contents.mediadecathlon.com/p1947527/k$fa2bd62f3fcc5440dcc050dedf02665b/sq/rower-gorski-mtb-st-530-275.jpg?format=auto&f=1296x1296",
                "description": "Push your limits and improve your performance.",
                "content": "The XC 900 has a carbon seatpost with a diameter of 27.2 mm, which thanks to its work helps to suppress small unevenness. The whole is complemented by Sram Level T brakes with 160 mm rotors and Hutchinson Skeleton TR 29 x 2.1 ″ tires.",
                "price": 1320,
                "colors": ["orange", "lightgreen", "lightblue", "black"],
                "count": 1
            },
            {
                "_id": "3",
                "title": "Rockrider XC 900",
                "src": "https://contents.mediadecathlon.com/p1863836/k$044cecb5d46ae70946b3a883735e7e8b/sq/rower-gorski-mtb-st-530-s-275.jpg?format=auto&f=1296x1296",
                "description": "Push your limits and improve your performance.",
                "content": "The XC 900 has a carbon seatpost with a diameter of 27.2 mm, which thanks to its work helps to suppress small unevenness. The whole is complemented by Sram Level T brakes with 160 mm rotors and Hutchinson Skeleton TR 29 x 2.1 ″ tires.",
                "price": 1320,
                "colors": ["orange", "lightgreen", "lightblue", "black"],
                "count": 1
            },
            {
                "_id": "4",
                "title": "Rockrider XC 900",
                "src": "https://contents.mediadecathlon.com/p1276519/k$13d043f6eb2db637f37478db517dbb67/sq/rower-gorski-mtb-st-100-275.jpg?format=auto&f=1296x1296",
                "description": "Push your limits and improve your performance.",
                "content": "The XC 900 has a carbon seatpost with a diameter of 27.2 mm, which thanks to its work helps to suppress small unevenness. The whole is complemented by Sram Level T brakes with 160 mm rotors and Hutchinson Skeleton TR 29 x 2.1 ″ tires.",
                "price": 1320,
                "colors": ["orange", "lightgreen", "lightblue", "black"],
                "count": 1
            },
            {
                "_id": "5",
                "title": "Rockrider XC 900",
                "src": "https://contents.mediadecathlon.com/p1576490/k$7209c5d4663b9efadb0a1545ba2d78e4/sq/rower-gorski-mtb-st-100-275-damski.jpg?format=auto&f=1296x1296",
                "description": "Push your limits and improve your performance.",
                "content": "The XC 900 has a carbon seatpost with a diameter of 27.2 mm, which thanks to its work helps to suppress small unevenness. The whole is complemented by Sram Level T brakes with 160 mm rotors and Hutchinson Skeleton TR 29 x 2.1 ″ tires.",
                "price": 1320,
                "colors": ["orange", "lightgreen", "lightblue", "black"],
                "count": 1
            },
            {
                "_id": "6",
                "title": "Rockrider XC 900",
                "src": "https://contents.mediadecathlon.com/p2008603/k$4640d74b2ba2d405ee69e126901686bc/sq/rower-gorski-mtb-st-540-v2-275.jpg?format=auto&f=1296x1296",
                "description": "Push your limits and improve your performance.",
                "content": "The XC 900 has a carbon seatpost with a diameter of 27.2 mm, which thanks to its work helps to suppress small unevenness. The whole is complemented by Sram Level T brakes with 160 mm rotors and Hutchinson Skeleton TR 29 x 2.1 ″ tires.",
                "price": 1320,
                "colors": ["orange", "lightgreen", "lightblue", "black"],
                "count": 1
            },
        ],
        cart: [],
        total: 0
    };

    addCart = (id) =>{
        const {products, cart} = this.state;
        const check = cart.every(item =>{
            return item._id !== id
        })
        if (check){
            const data = products.filter(product =>{
                return product._id === id
            })
            this.setState({cart: [...cart,...data]})
        }else{
            alert("The product has been added to cart.")
        }
    };

    reduction = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count === 1 ? item.count = 1 : item.count -=1;
            }
        })
        this.setState({cart: cart})
        this.getTotal();

    };
    increase = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count +=1;
            }
        })
        this.setState({cart: cart})
        this.getTotal();
    };

    removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            const {cart} = this.state;
            cart.forEach((item, index) =>{
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })
            this.setState({cart: cart})
            this.getTotal();
        }
    };

    getTotal = ()=>{
        const {cart} = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.count);
        },0)
        this.setState({total: res})
    };

    componentDidUpdate(){
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    };

    componentDidMount(){
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if(dataCart !== null){
            this.setState({cart: dataCart});
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if(dataTotal !== null){
            this.setState({total: dataTotal});
        }
    }

    render() {
        const {products, cart, total} = this.state;
        const {addCart, reduction, increase, removeProduct, getTotal} = this;
        return (
            <DataContext.Provider value={{products, addCart, cart, reduction, increase, removeProduct, total, getTotal}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}