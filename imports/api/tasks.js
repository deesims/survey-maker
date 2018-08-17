import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  'tasks.insert'(customer) {
    check(customer.firstName, String);
    check(customer.lastName, String);
    check(customer.email, String);
    check(customer.tel, String);
    check(customer.addr, String);
    check(customer.city, String);
    check(customer.zip, String);
    check(customer.country, String);
    check(customer.comments, String);

    // Make sure the user is logged in before inserting a task
    //if (! this.userId) {
     // throw new Meteor.Error('not-authorized');
    //}

    Tasks.insert({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      tel: customer.tel,
      addr: customer.addr,
      city: customer.city,
      zip: customer.zip,
      country: customer.country,
      comments: customer.comments,
      createdAt: new Date(),
    });
  },
  'tasks.remove'(taskId) {
    check(taskId, String);

    Tasks.remove(taskId);
  },
  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
});
