import React from 'react';
import { When } from './if';
import Modal from './modal';

export default function Details(props) {
  return (
    <When condition={props.showDetails}>
        <Modal title="To Do Item" close={props.toggleDetails}>
          <div className="todo-details">
            <header>
              <span>Assigned To: {props.details.assignee}</span>
              <span>Due: {props.details.due}</span>
            </header>
            <div className="item">
              {props.details.text}
            </div>
          </div>
        </Modal>
    </When>      
  )
}