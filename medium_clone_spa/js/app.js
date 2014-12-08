$(function() {

  var compile_template = function(id) {
    var source   = $(id).html();
    return Handlebars.compile(source);
  };

  var Router = Backbone.Router.extend({

    routes: {
      "":         "index",
      "index":    "index",
      "signup":   "signup",
      "login":    "login"
    },

    index: function() {
      $.ajax( "http://api.medium-clone-api.dev/posts.json", {
        complete: function( data ) {
          $('#container').html(compile_template("#posts_t")({posts: data.responseJSON}));
        }
      });
    },

    signup: function() {
      $('#container').html(compile_template("#signup_t")());
    },

    login: function() {
      $('#container').html(compile_template("#login_t")());
    }

  });

  new Router();
  Backbone.history.start();

});
