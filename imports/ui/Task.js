import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../api/tasks.js';

import Modal from '../ui/Modal.js';

// Task component - represents a single todo item
export default class Task extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
  }

  deleteThisTask() {
    Meteor.call('tasks.remove', this.props.task._id);
    console.log("Contact removed.");
  }

  displayView(){
       console.log('Viewing the form. Record_ID: ' + this.props.task._id);
 }

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = this.props.task.checked ? 'checked' : '';
    const realHref = '#' + this.props.task._id;

    return (

           <div>
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteThisTask.bind(this)}>
          &times;
        </button>

           <Modal task={this.props.task} />

<span className="text">
<a data-toggle="modal" data-target={realHref} href="#view" onClick={this.displayView.bind(this)}>
 {this.props.task._id}
</a>
</span>
      </li>
      </div>

    );
  }
}
