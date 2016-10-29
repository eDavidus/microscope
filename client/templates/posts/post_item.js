Template.postItem.helpers({
    ownPost: function() {
      return this.userId === Meteor.userId();  
    },
    domain: function() {
        var a = document.createElement('a'); // create an empty anchor html element and store in memory
        a.href = this.url; // set href attribute to the element
        return a.hostname; // hostname property to get back the link's  domain name without the rest of the url
    },
    // commentsCount: function() {
    //     console.log("from postItem template ");
    //     console.log(this);
    //   return Comments.find({postId: this._id}).count();  
    // }
});