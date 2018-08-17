import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js';
import { Accounts } from 'meteor/accounts-base';



Meteor.startup(() => {
  // Creating admin user on first server run

if (Meteor.users.find().count() === 0){
       Accounts.createUser({
                  username: 'admin',
                  email : 'admin@admin.com',
                 password : 'admin',
         });
}

});
