$(function() {

  var Router = Backbone.Router.extend({

    routes: {
      "":                     "index", // root
      "index":                "index"  // index
    },

    index: function() {
      var source   = $("#posts_template").html();
      var template = Handlebars.compile(source);

      $.ajax( "http://api.medium-clone-api.dev/posts.json", {
        complete: function( data ) {
          $('#posts').html(template({posts: data.responseJSON}));
        }
      });
    }

  });

  new Router();
  Backbone.history.start();

});
