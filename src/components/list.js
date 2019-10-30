import React from 'react';
import useSettings from '../context/settings';
import { useEffect } from 'react';
import { When } from '../components/if/index';

export default function List(props) {
  let settings = useSettings();

  let pageNumbers = Math.ceil(props.todoList.length / settings.numItems);
  let listPartials = [];
  for(let i = 0; i < pageNumbers; i++) {
    let indexTracker = i * settings.numItems;
    let partialList = props.todoList.slice(0 + indexTracker, settings.numItems + indexTracker);
    listPartials.push(partialList);
  } 

  return (
    <div>
      <ul>
        { (listPartials[settings.pageNumber] ? listPartials[settings.pageNumber] : []).map(item => (
          <li
            className={`complete-${item.complete.toString()}`}
            key={item._id}
          >
            <span onClick={() => props.toggleComplete(item._id)}>
              {item.text}
            </span>
            <button onClick={() => props.toggleDetails(item._id)}>
              Details
            </button>
            <button onClick={() => props.deleteItem(item._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <When condition={pageNumbers > 1 && settings.pageNumber !== pageNumbers - 1 }>
        <button onClick={() => {settings.setPageNumber(settings.pageNumber + 1)}}>Next</button>
      </When>
      <When condition={settings.pageNumber > 0}>
        <button onClick={() => {settings.setPageNumber(settings.pageNumber - 1)}}>Previous</button>
      </When>
      <When condition={pageNumbers > 0}>
        <span>Page {settings.pageNumber + 1}/{pageNumbers}</span>
      </When>

    </div>
  )
}