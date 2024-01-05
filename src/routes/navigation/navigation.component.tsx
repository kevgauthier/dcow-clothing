import { Fragment } from 'react';
import { Outlet} from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { ReactComponent as CrwLogo} from '../../assets/crown.svg';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

import { selectCurrentUser } from '../../store/user/user.selector';
import { NavigationContainer,LogoContainer, NavLinks, NavLink } from  "./navigation.styles";
import { signOutStart } from '../../store/user/user.action';

import CartIcon from '../../component/cart-icon/cart-icon.component';
import CartDropdown from '../../component/cart-dropdown/cart-dropdown.component'; 



const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

    const signOutUser = () => dispatch(signOutStart());
    

    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to="/">
                <CrwLogo className='logo'/>
            </LogoContainer>
          <NavLinks>
            <NavLink to="/shop">
                SHOP
            </NavLink>
            
            { currentUser ? (
              <span onClick={signOutUser} > SIGN OUT </span>
            ) : (
              <NavLink className='nav-link' to="/auth"> SIGN IN </NavLink>
            )}

            <CartIcon />
              
          </NavLinks>
          
          {isCartOpen && <CartDropdown />}

        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
  }
  export default Navigation