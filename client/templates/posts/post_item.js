Template.postItem.helpers({
    domain: function() {
        var a = document.createElement('a'); // create an empty anchor html element and store in memory
        a.href = this.url; // set href attribute
        return a.hostname; // hostname property to get back the link's  domain name without the rest of the url
    }
});