import React, { useEffect, useState } from 'react';
import ItemForm from './ItemForm';
import Filter from './Filter';
import Item from './Item';

const url = 'http://localhost:4000/items';

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [items, setItems] = useState([]);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const onNewItemSubmit = newItem => {
    setItems([...items, newItem]);
  };

  const onItemUpdate = updatedItem => {
    setItems(
      items.map(item => {
        if (item.id !== updatedItem.id) return item;
        item.isInCart = updatedItem.isInCart;
        return item;
      })
    );
  };

  const itemsToDisplay = items.filter(item => {
    if (selectedCategory === 'All') return true;

    return item.category === selectedCategory;
  });

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setItems(data);
      });
  }, []);

  return (
    <div className="ShoppingList">
      <ItemForm onNewItemSubmit={onNewItemSubmit} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map(item => (
          <Item key={item.id} item={item} onItemUpdate={onItemUpdate} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
