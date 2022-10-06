import './checkout.styles.scss'
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-context';
import CheckoutItem from '../../components/Checkout-Item/checkout-item.component';


const Checkout = () => {

    const { cartItems } = useContext(CartContext);
    

    let totalPrice = 0;

    cartItems.map((cartItem) => {
        const { quantity, price } = cartItem;
        return totalPrice += quantity * price ; 
    })



    return (
        <div className='checkout-container' >
            <div className="checkout-header">

                <div className="header-block">
                    <span>Product</span>
                </div>

                <div className="header-block">
                    <span>Description</span>
                </div>

                <div className="header-block">
                    <span>Quantity</span>
                </div>

                <div className="header-block">
                    <span>Price</span>
                </div>

                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>

            {cartItems.map((cartItem) => (
               <CheckoutItem id={cartItem.id} cartItem={cartItem}/>
            ))}
            <span className='total'>Total: ${totalPrice}</span>
        </div>
    )
}

export default Checkout;