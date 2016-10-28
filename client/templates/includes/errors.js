Template.errors.helpers({
    errors: function() {
        return Errors.find();
    }
});

// remove errors from database after 5 seconds
Template.error.onRendered(function() {
  var error = this.data;
  Meteor.setTimeout(function () {
    Errors.remove(error._id);
  }, 7000);
});