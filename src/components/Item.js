import React from 'react';

const url = 'http://localhost:4000/items/';

function Item({ item, onItemUpdate, removeFromList }) {
  const addToCart = () => {
    // console.log(item);
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isInCart: !item.isInCart }),
    };
    fetch(url + item.id, options)
      .then(res => res.json())
      .then(updatedItem => onItemUpdate(updatedItem));
  };
  const deleteItem = () => {
    fetch(url + item.id, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => removeFromList(item.id));
  };

  return (
    <li className={item.isInCart ? 'in-cart' : ''}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? 'remove' : 'add'} onClick={addToCart}>
        {item.isInCart ? 'Remove From' : 'Add to'} Cart
      </button>
      <button className="remove" onClick={deleteItem}>
        Delete
      </button>
    </li>
  );
}

export default Item;
