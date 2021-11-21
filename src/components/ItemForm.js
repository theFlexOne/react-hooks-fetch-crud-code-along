import React, { useState } from 'react';

function ItemForm({ onNewItemSubmit }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Produce');

  const handleSubmit = e => {
    e.preventDefault();
    const url = 'http://localhost:4000/items';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        category,
        isInCart: false,
      }),
    };
    fetch(url, options)
      .then(res => res.json())
      .then(data => onNewItemSubmit(data));
  };

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
