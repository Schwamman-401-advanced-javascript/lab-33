import React from 'react';
import { useState } from 'react';
import uuid from 'uuid/v4';
import useSettings from '../context/settings';

export default function Form(props) {
  let settings = useSettings();

  let initialItem = {};
  let [item, setItem] = useState(initialItem);

  let handleInputChange = e => {
    let { name, value } = e.target;
    setItem({
      ...item,
       [name]: value,
    });
   
  };

  let addItem = (e) => {

    e.preventDefault();
    e.target.reset();

    const defaults = { _id: uuid(), complete:false };
    const newItem = Object.assign({}, item, defaults);

    props.addItem(newItem);

    setItem({});
  };

  let changeContext = (e) => {
    settings.setNumItems(e.target.value);
  }

  return (
    <div>
      <h3>Add Item</h3>
      <form onSubmit={addItem}>
        <label>
          <span>To Do Item</span>
          <input
            name="text"
            placeholder="Add To Do List Item"
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          <span>Difficulty Rating</span>
          <input type="range" min="1" max="5" name="difficulty" defaultValue="3" onChange={handleInputChange} required />
        </label>
        <label>
          <span>Assigned To</span>
          <input type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange} required />
        </label>
        <label>
          <span>Due</span>
          <input type="date" name="due" onChange={handleInputChange} required />
        </label>
        <button>Add Item</button>
      </form>
      <br/>
      <form>
        <label>
          <span>Num of Items to Display: {settings.numItems}</span>
          <input type="range" min="3" max="20" name="listItems" defaultValue={settings.numItems} onChange={changeContext} />
        </label>
        <label>
          <span>Show Completed:</span>
          <input type="checkbox" onChange={settings.toggleDisplayCompleted}></input>
        </label>
      </form>
    </div>
  )
}