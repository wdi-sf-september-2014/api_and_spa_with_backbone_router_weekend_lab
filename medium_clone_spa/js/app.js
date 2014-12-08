$(function() {

  var Router = Backbone.Router.extend({

    routes: {
      "":         "index",
      "index":    "index",
      "signup":   "signup",
      "login":    "login"
    },

    index: function() {
      var source   = $("#posts_t").html();
      var template = Handlebars.compile(source);

      $.ajax( "http://api.medium-clone-api.dev/posts.json", {
        complete: function( data ) {
          $('#container').html(template({posts: data.responseJSON}));
        }
      });
    },

    signup: function() {
      var source   = $("#signup_t").html();
      var template = Handlebars.compile(source);
      $('#container').html(template());
    },

    login: function() {
      var source   = $("#login_t").html();
      var template = Handlebars.compile(source);
      $('#container').html(template());
    }

  });

  new Router();
  Backbone.history.start();

});
