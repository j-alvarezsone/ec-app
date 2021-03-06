import React from 'react';
import { TableContainer, Table, TableBody, TableCell, TableRow, IconButton } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderedIcon from '@material-ui/icons/FavoriteBorder';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  iconCell: {
    padding: 0,
    height: 48,
    width: 48,
  },
});
const SizeTable = (props) => {
  const classes = useStyles();
  const sizes = props.sizes;

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {sizes.length > 0 &&
            sizes.map((item, i) => (
              <TableRow key={item.size}>
                <TableCell component='th' scope='row'>
                  {item.size.toUpperCase()}
                </TableCell>
                <TableCell>Remaining {item.quantity}</TableCell>
                <TableCell className={classes.iconCell}>
                  {item.quantity > 0 ? (
                    <IconButton onClick={() => props.addProduct(item.size)}>
                      <ShoppingCartIcon />
                    </IconButton>
                  ) : (
                    <div>Sold out</div>
                  )}
                </TableCell>
                <TableCell className={classes.iconCell}>
                  <IconButton>
                    <FavoriteBorderedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SizeTable;
