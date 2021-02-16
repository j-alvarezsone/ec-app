import React, { useEffect } from 'react';
import { Badge, IconButton } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsInCart, getUserId } from '../../redux/users/selectors';
import { db } from '../../firebase';
import { fetchProductsInCart } from '../../redux/users/operations';
const HeaderMenus = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  let productsInCart = getProductsInCart(selector);
  const userId = getUserId(selector);

  // Listen products in user's cart
  useEffect(() => {
    let productsInCart = getProductsInCart(selector);

    const unsubscribe = db
      .collection('users')
      .doc(userId)
      .collection('cart')
      .onSnapshot((snapshots) => {
        snapshots.docChanges().forEach((change) => {
          const product = change.doc.data();
          const changeType = change.type;

          switch (changeType) {
            case 'added':
              productsInCart.push(product);
              break;
            case 'modified':
              const index = productsInCart.findIndex((product) => product.cartId === change.doc.id);
              productsInCart[index] = product;
              break;
            case 'removed':
              productsInCart = productsInCart.filter((product) => product.cartId !== change.doc.id);
              break;
            default:
              break;
          }
        });

        dispatch(fetchProductsInCart(productsInCart));
      });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <IconButton>
        <Badge badgeContent={productsInCart.length} color='secondary'>
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorderIcon />
      </IconButton>
      <IconButton onClick={(e) => props.handleDrawerToggle(e)}>
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default HeaderMenus;
