import React from 'react';
import { addToCart, getProductsInCart, getTotalCartValue, removeFromCart } from '../cart/cart.slice';
import { Product } from '../products/products.slice';
import { useAppDispatch, useAppSelector } from '../store.hooks';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';



const ProductsList: React.FC = () => {

    const totalCartValue = useAppSelector(getTotalCartValue);
    const productsInCart = useAppSelector(getProductsInCart);
    const dispatch = useAppDispatch()

    const addToCartHandler = (productInCart: Product) => dispatch(addToCart(productInCart));
    const removeFromCartHandler = (productId: number) => dispatch(removeFromCart(productId))

    return (
        <Wrapper>
            <h2>Cart</h2>
            <h5>Total: ${totalCartValue}</h5>
            <InnerWrapper>
                {productsInCart.length === 0 ? <p>Your Cart is Empty. Please select some items to proceed.</p> : null}
                {productsInCart.map(productInCart => (
                    <div key = {productInCart.id}>
                        <h3>{productInCart.title}</h3>
                        <div className='widget'>
                            <Button size = 'small' disableElevation variant='contained' onClick= {() => addToCartHandler(productInCart)}> + </Button>
                            <span>{productInCart.quantity}</span>
                            <Button size = 'small' disableElevation variant='contained' onClick= {() => removeFromCartHandler(productInCart.id)}> - </Button>
                        </div>
                    </div>
            ))}
            </InnerWrapper>
        </Wrapper>
    )
}

export default ProductsList;



const Wrapper = styled.aside`
  font-family: Arial, Helvetica, sans-serif;
  width: 500px;
  padding: 20px;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: Arial, Helvetica, sans-serif;
  border-bottom: 1px solid lightblue;
  padding-bottom: 20px;
  div {
    flex: 1;
  }

  .widget {
    display: flex;
    justify-content: space-between;
  }
`;

