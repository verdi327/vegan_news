Template.postSubmit.events({
  "submit form": function(event){
    event.preventDefault();

    var post = {
      url: $(event.target).find("[name=url]").val(),
      title: $(event.target).find("[name=title]").val(),
    }

    Meteor.call("post", post, function(error, id) {
      if (error) {
        // display error to user
        throwError(error.reason);

        // if the error is that the post already exists, take us there
        if (error.error === 302) {
          Meteor.Router.to("postPage", error.details)
        }
      }
      else {
        Meteor.Router.to("postPage", id)
      }
    });

  }
});