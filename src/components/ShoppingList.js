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

  const handleNewItemSubmit = item => {
    // const options
    // fetch(url, options)
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
      <ItemForm />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map(item => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
