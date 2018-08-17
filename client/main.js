import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import  App  from '../imports/ui/App.js';
import '../imports/api/tasks.js';
import '../imports/startup/accounts-config.js';
import '../imports/ui/Home_page.html'
import '../imports/ui/App.html'

import '../client/main.html'

Tracker.autorun(function(c) {
  var user = Meteor.user();
  var userId = Meteor.userId();
  if (c.firstRun)
    return;
  console.log(userId ? 'Logged in ! username: ' + user.username : 'Logged out !');


});

FlowRouter.route('/', {
  name: 'Lists.show',
  action(params, queryParams) {
         console.log("Home Page.")
         BlazeLayout.render('Home_page', {main: 'Lists_show_page'});
  }
});
FlowRouter.route('/contact', {
  name: 'Contact.get',
  action(params, queryParams) {
         BlazeLayout.render("App");
         console.log("Contact Page.")
         render(<App />, document.getElementById('render-target'));
  }
});
FlowRouter.route("/submitted", {
       name: 'Contact.post',
       action(params, queryParams){
              console.log("Contact submitted.")
       }
});
FlowRouter.route("/views", {
       name: 'Form.view',
       action(params, queryParams){
              console.log("Viewing form...");
       }
});

Meteor.startup(() => {
       //render(<App/>, document.getElementById('render-target'));
});
