import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../api/tasks.js';
import ReactDOM from 'react-dom';

import Task from './Task.js';

export default class Modal extends Component {

       render(){
              return(
              <div className="modal fade" id={this.props.task._id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Record_ID: {this.props.task._id}</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      First Name: {this.props.task.firstName} <br/>
                      Last Name: {this.props.task.lastName} <br/>
                      Email: {this.props.task.email} <br/>
                      Telephone: {this.props.task.tel} <br/>
                      Address: {this.props.task.addr} <br />
                      City: {this.props.task.city} <br />
                      Zip: {this.props.task.zip} <br />
                      Country: {this.props.task.country} <br />
                      Comments: {this.props.task.comments} <br />


                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>)
       }

}
