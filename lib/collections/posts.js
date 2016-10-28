Posts = new Mongo.Collection('posts');

// Posts.allow({
//   insert: function(userId, doc) {
//     // only allow posting if you are logged in
//     return !! userId;
//   }
// });

Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); }
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

// ensure at server side that there is no blanl field
Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.url;
  }
});

Meteor.methods({
  postInsert: function(postAttributes) {
    // check methods from check and check-audit packages
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });
    
    // if (Meteor.isServer) {
    //   postAttributes.title += "(server)";
    //   // wait for 5 seconds
    //   Meteor._sleepForMs(5000);
    // } else {
    //   postAttributes.title += "(client)";
    // }
    
    // validates at server side that postAttributes has a URL and a title
    var errors = validatePost(postAttributes);
    if (errors.urll || errors.title) {
      throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");
    }
    
    var postWithSameLink = Posts.findOne({url: postAttributes.url});
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      };
    }
    
    var user = Meteor.user();
    // the extend function add key value pairs to the object 
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    
    var postId = Posts.insert(post);
    
    return {
      _id: postId
    };
  }
});

// returns error object for form validation
validatePost = function(post) {
  var errors = {};
  
  if (!post.title) {
    errors.title = "Please fill in a title";
  }
  
  if(!post.url) {
    errors.url = "Please fill in a URL";
  }
  
  return errors;
};
