Template.postSubmit.events({
    'submit form': function(e) {
        e.preventDefault(); // to prevent the browser to submit the form
        
        var post = {
          url: $(e.target).find('[name=url]').val(),
          title: $(e.target).find('[name=title]').val()
        };
        
        Meteor.call('postInsert', post, function(error, result) {
            // display error and stop
            if (error) {
                return alert(error.reason);
            }
            
            if (result.postExists) {
                alert('This link has been posted');
            }
            Router.go('postPage', {_id: result._id});
        });
    }
});