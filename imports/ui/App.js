import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';

import {Tasks} from '../api/tasks.js';
import Task from './Task.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';

// App component - represents the whole app
class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hideCompleted: false,
        };
    }

    toggleHideCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        FlowRouter.go('Contact.post');
        // Find the text field via the React ref

        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        const lastN = ReactDOM.findDOMNode(this.refs.lastNameInput).value.trim();
        const email = ReactDOM.findDOMNode(this.refs.emailInput).value.trim();
        const tel = ReactDOM.findDOMNode(this.refs.telInput).value.trim();
        const addr = ReactDOM.findDOMNode(this.refs.addrInput).value.trim();
        const city = ReactDOM.findDOMNode(this.refs.cityInput).value.trim();
        const zip = ReactDOM.findDOMNode(this.refs.zipInput).value.trim();
        const country = ReactDOM.findDOMNode(this.refs.countryInput).value.trim();
        const comments = ReactDOM.findDOMNode(this.refs.comments).value.trim();

        const customer = {
            firstName: text,
            lastName: lastN,
            email: email,
            tel: tel,
            addr: addr,
            city: city,
            zip: zip,
            country: country,
            comments: comments,
        };

        Meteor.call('tasks.insert', customer);

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
        ReactDOM.findDOMNode(this.refs.lastNameInput).value = '';
        ReactDOM.findDOMNode(this.refs.emailInput).value = '';
        ReactDOM.findDOMNode(this.refs.telInput).value = '';
        ReactDOM.findDOMNode(this.refs.addrInput).value = '';
        ReactDOM.findDOMNode(this.refs.cityInput).value = '';
        ReactDOM.findDOMNode(this.refs.zipInput).value = '';
        ReactDOM.findDOMNode(this.refs.countryInput).value = '';
        ReactDOM.findDOMNode(this.refs.comments).value = '';
        FlowRouter.go('Contact.get');
    }


    renderTasks() {
        let filteredTasks = this.props.tasks;
        if (this.state.hideCompleted) {
            filteredTasks = filteredTasks.filter(task => !task.checked);
        }
        return filteredTasks.map((task) => (
            <Task key={task._id} task={task}/>
        ));
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <header>
                        <h1>Contact Submissions ({this.props.incompleteCount})</h1>

                        <AccountsUIWrapper/>
                    </header>
                </div>

                <div className="col-sm-12">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="row">
                            <div className="col-sm-6">
                                <input className="form-control" placeholder="First Name" ref="textInput" id="first_name"
                                       type="text" required/>
                            </div>
                            <div className="col-sm-6">
                                <input className="form-control" placeholder="Last Name" ref="lastNameInput"
                                       id="last_name" type="text" required/>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-sm-6">
                                <input
                                    className="form-control"
                                    type="email"
                                    ref="emailInput"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="col-sm-6">
                                <input
                                    className="form-control"
                                    type="tel"
                                    name="usrtel"
                                    ref="telInput"
                                    placeholder="Telephone (000) 000-0000 "
                                    pattern="[0-9]{3} [0-9]{3}-[0-9]{4}"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <br/>
                                <input
                                    className="form-control"
                                    type="text"
                                    ref="addrInput"
                                    placeholder="Enter your address"
                                    required
                                />
                            </div>
                            <div className="col-sm-6">
                                <br/>
                                <input
                                    className="form-control"
                                    type="text"
                                    ref="cityInput"
                                    placeholder="Enter your city"
                                    required
                                />


                                <br/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-6">
                                <input className="form-control"
                                       type="text"
                                       ref="zipInput"
                                       placeholder="Enter your zip (K1A 2A7)"
                                       pattern="[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]"
                                       required
                                />
                            </div>
                            <div className="col-sm-6">
                                <input className="form-control"
                                       type="text"
                                       ref="countryInput"
                                       placeholder="Country"
                                       required
                                />
                            </div>
                        </div>
                        <br/>

                        <div className="row">
                            <div className="col-sm-12">
                                   <textarea className="form-control"
                                             type="textbox"
                                             ref="comments"
                                             placeholder="Comments"
                                             required
                                   />
                            </div>
                        </div>
                        <br/>
                        <div className="col-lg-12 text-center">
                            <button type="submit" className="btn btn-success">Submit Form</button>
                            <br/><br/>
                        </div>
                    </form>
                </div>


                <div className="row">
                    <div className="col-auto"></div>
                    <div className="col">
                        <hr/>
                    </div>
                </div>


                {this.props.currentUser ?
                    <div className="row">
                        <div className="col-sm-12">
                            <ul>
                                {this.renderTasks()}
                            </ul>
                        </div>
                    </div> : ''
                }
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
        incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
        currentUser: Meteor.user(),
    };
})(App);
