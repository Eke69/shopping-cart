import { Badge, Drawer } from "@material-ui/core";
import Cart from "./components/Cart";
import ProductsList from "./components/ProductsList";
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useState } from "react";
import { useAppSelector } from "./store.hooks";
import { getTotalItems } from "./cart/cart.slice";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 300;
const useStyles = makeStyles(theme => ({
  drawer: {
    flexShrink: 0,
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth,
  }
}));

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const totalItems = useAppSelector(getTotalItems);
  const classes = useStyles();
  
  
  
  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)} variant="temporary" className={classes.drawer} classes={{
          paper: classes.drawerPaper
        }}>
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
  .drawer {
    flexShrink: 0;
    width: 200
  }
`;

const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 100;
  right: 20px;
  top: 20px;
`;
