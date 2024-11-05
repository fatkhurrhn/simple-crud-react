import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setItems(items.map(item => item.id === editId ? { ...item, name: input } : item));
      setEditId(null);
    } else {
      setItems([...items, { id: uuidv4(), name: input }]);
    }
    setInput('');
  };

  const handleEdit = (id) => {
    const itemToEdit = items.find(item => item.id === id);
    setInput(itemToEdit.name);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <h1>Simple CRUD App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add an item"
          required
        />
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
      </form>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleEdit(item.id)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
