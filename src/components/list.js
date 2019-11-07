import React from 'react';
import useSettings from '../context/settings';
import { useEffect } from 'react';
import { When } from '../components/if/index';

export default function List(props) {
  let settings = useSettings();

  let numPages = Math.ceil(props.todoList.length / settings.numItems);
  let listPartials = [];
  for(let i = 0; i < numPages; i++) {
    let indexTracker = i * settings.numItems;
    let partialList = props.todoList.slice(0 + indexTracker, settings.numItems + indexTracker);
    listPartials.push(partialList);
  } 

  return (
    <div>
      <ul>
        { (listPartials[settings.pageNumber] ? listPartials[settings.pageNumber] : []).map(item => (
          <When condition={settings.displayCompleted === true || item.complete === false}>
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
          </When>
        ))}
      </ul>
      <div className="numPages">
        <When condition={settings.pageNumber > 0}>
          <button className="previousBtn" onClick={() => {settings.setPageNumber(settings.pageNumber - 1)}}>Previous</button>
        </When>
        <When condition={numPages > 0}>
            <span>Page {settings.pageNumber + 1}/{numPages}</span>
        </When>
        <When condition={numPages > 1 && settings.pageNumber !== numPages - 1 }>
          <button className="nextBtn" onClick={() => {settings.setPageNumber(settings.pageNumber + 1)}}>Next</button>
        </When>
      </div>

    </div>
  )
}