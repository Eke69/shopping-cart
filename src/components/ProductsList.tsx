import Grid from '@material-ui/core/Grid';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addToCart } from '../cart/cart.slice';
import { getProducts, getProductsSelector, Product } from '../products/products.slice';
import { useAppDispatch } from '../store.hooks';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';



const ProductsList: React.FC = () => {
    const {products, loading} = useSelector(getProductsSelector)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getProducts())
      }, [dispatch])

    

    const addToCartHandler = (product: Product) => dispatch(addToCart(product))

    if (loading) return <p>Loading...</p>
    return (
        <Wrapper>
            <h2>List of Items</h2>
            <Grid container spacing={3}>
            {products?.map(product => 
                <Grid item key={product.id} xs={12} sm={6} md={3}>
                    <InnerWrapper>
                    <img src={product.image} alt={product.title} />
                    <div>
                        <h2>{product.title}</h2> 
                        <h3>{product.amount}</h3>
                    </div>
                    <Button onClick= {() => addToCartHandler(product)}>Add to cart</Button>
                    </InnerWrapper>
                </Grid>
            )}
            </Grid>
        </Wrapper>
    )
}

export default ProductsList

//styling
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  border: 1px solid lightblue;
  border-radius: 20px;
  height: 100%;

  h2{
    padding-left: 2em;
  }

  button {
    border-radius: 0 0 20px 20px;
  }
  img {
    max-height: 200px;
    object-fit: cover;
    border-radius: 20px 20px 0 0;
  }
  div {
    font-family: Arial, Helvetica, sans-serif;
    padding: 1rem;
    height: 100%;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 80%;
  border: 1px solid lightblue;
  border-radius: 20px;
  height: 100%;

  button {
    border-radius: 0 0 20px 20px;
  }

  img {
    max-height: 250px;
    object-fit: cover;
    border-radius: 20px 20px 0 0;
  }

  div {
    font-family: Arial, Helvetica, sans-serif;
    padding: 0.5rem;
    height: 100%;
  }
`;




