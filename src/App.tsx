import { Badge, Drawer } from "@material-ui/core";
import Cart from "./components/Cart";
import ProductsList from "./components/ProductsList";
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useState } from "react";
import { useAppSelector } from "./store.hooks";
import { getTotalItems } from "./cart/cart.slice";

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const totalItems = useAppSelector(getTotalItems);
  
  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart/>
      </Drawer>
      <div className='nav'>
        <StyledButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={totalItems} color='error' showZero>
            <AddShoppingCartIcon />
          </Badge>
      </StyledButton>
      </div>
        <ProductsList/>
    </Wrapper>
  );
}

export default App;



const Wrapper = styled.div`
  margin: 40px;

  .nav {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-right: 20px
  }
`;

const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 100;
  right: 20px;
  top: 20px;
`;
