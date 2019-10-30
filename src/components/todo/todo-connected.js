import React from 'react';
import { useState, useEffect } from 'react';

//Components
import Header from '../header';
import Form from '../form';
import List from '../list';
import Details from '../details';

import './todo.scss';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

export default function ToDo() {
  let initialList = [];
  let [todoList, setTodoList] = useState(initialList);

  let initialShowDetails = false;
  let [showDetails, setShowDetails] = useState(initialShowDetails);

  let initialDetails = {};
  let [details, setDetails] = useState(initialDetails);

  let callAPI = (url, method='get', body, handler, errorHandler) => {

    return fetch(url, {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(data => typeof handler === 'function' ? handler(data) : null )
      .catch( (e) => typeof errorHandler === 'function' ? errorHandler(e) : console.error(e)  );
  };

  let addItem = (item) => {
    const _updateState = (data) => {
      item['_id'] = data._id;
      console.log(item);
      setTodoList( () => ([...todoList, item]));
    }

    let newItem = Object.assign({}, item);
    delete newItem._id;

    callAPI( todoAPI, 'POST', newItem, _updateState );
  };

  let deleteItem = id => {
    const _updateState = () => {
      let newList = todoList.filter(item => item._id !== id);
      setTodoList(newList);
    }

    callAPI( `${todoAPI}/${id}`, 'DELETE', undefined, _updateState );
  };

  let saveItem = (updatedItem, id) => {
    const _updateState = (newItem) =>
      setTodoList(
        todoList.map(item =>
          item._id === id ? {
            ...item,
            complete: !item.complete,
          } : item
        )
      )
    callAPI( `${todoAPI}/${updatedItem._id}`, 'PUT', updatedItem, _updateState );
  };

  let toggleComplete = id => {
    let item = todoList.find(i => i._id === id);
    if (item._id) {
      saveItem({
        ...item,
        complete: !item.complete,
      }, id);
    }
  };

  let toggleDetails = id => {
    let toggledItem = todoList.find(item => item._id === id);
    setDetails(toggledItem || {});
    setShowDetails(!!toggledItem);
  }

  let getTodoItems = () => {
    const _updateState = data => setTodoList(data.results);
    callAPI( todoAPI, 'GET', undefined, _updateState );
  };

  let componentDidMount = () => {
    getTodoItems();
  }

  useEffect(() => {
    getTodoItems();
  }, []);

  return (
    <>
      <Header 
        todoList={todoList}
      />
      <section className="todo">
        <Form 
          addItem={addItem}
        />
        <List 
          todoList={todoList}
          toggleComplete={toggleComplete}
          toggleDetails={toggleDetails}
          deleteItem={deleteItem}
        />
      </section>
      <Details
        showDetails={showDetails}
        details={details}
        toggleDetails={toggleDetails}
      />
    </>
  );

}
