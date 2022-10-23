import {
    CheckoutItemContainer,
    ImageContainer,
    Arrow,
    BaseSpan,
    Quantity, 
    Value, 
    RemoveButton
} from './checkout-item.styles'

import { CartContext } from '../../contexts/cart-context';
import { useContext } from 'react';

const CheckoutItem = ({cartItem}) =>{

    const {name, imageUrl, price, quantity} = cartItem;

    const { clearItemToCart, addItemToCart, removeItemToCart} = useContext(CartContext)

    

    const clearItemHandler = () => clearItemToCart(cartItem)
    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemToCart(cartItem);

    return(
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick={removeItemHandler}>
                    &#10094;
                </Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>
                    &#10095;
                </Arrow>
            </Quantity>
            <BaseSpan>{price}</BaseSpan>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
};

export default CheckoutItem;