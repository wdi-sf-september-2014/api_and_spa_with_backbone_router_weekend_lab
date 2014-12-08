$(function() {

  var compile_template = function(id) {
    var source   = $(id).html();
    return Handlebars.compile(source);
  };

  var root_uri =  "http://api.medium-clone-api.dev";

  var Router = Backbone.Router.extend({

    routes: {
      "":               "index",
      "index":          "index",
      "signup":         "signup",
      "login":          "login",
      "posts/new":      "new_post",
      "posts/:id/show": "show_post"
    },

    index: function() {
      if (!sessionStorage.getItem("auth_token")) {
        $('.not-signed-in').show();
      } else {
        $('.not-signed-in').hide();
      }
      $.ajax(root_uri + "/posts.json", {
        complete: function( data ) {
          $('#container').html(compile_template("#posts_t")({posts: data.responseJSON}));
        }
      });
    },

    signup: function() {
      $('#container').html(compile_template("#signup_t")());
      $('#signup').submit(function(event){
        event.preventDefault();
        
        $.ajax(root_uri + "/users.json", {
          method: "POST",
          data: {
            user: {
              first: $('#signup input[name=first]').val(),
              last: $('#signup input[name=last]').val(),
              email: $('#signup input[name=email]').val(),
              password: $('#signup input[name=password]').val()
            }
          },
          complete: function ( data ) {
            sessionStorage.setItem("auth_token", data.responseJSON.auth_token);
            sessionStorage.setItem("user_id", data.responseJSON.id);
            app.navigate('index', {trigger: true});
          }
        });
      });
    },

    login: function() {
      $('#container').html(compile_template("#login_t")());
      $('#login').submit(function(event){
        event.preventDefault();

        $.ajax(root_uri + "/users/login.json", {
          method: "POST",
          data: {
            email: $('#login input[name=email]').val(),
            password: $('#login input[name=password]').val()
          },
          complete: function ( data ) {
            sessionStorage.setItem("auth_token", data.responseJSON.auth_token);
            sessionStorage.setItem("user_id", data.responseJSON.id);
            app.navigate('index', {trigger: true});
          }
        });
      });
    },

    new_post: function() {
      if (sessionStorage.getItem("auth_token")) {
        $('#container').html(compile_template("#new_post_t")());
      } else {
        app.navigate('login');
      }
    },

    show_post: function() {
      $('#container').html(compile_template("#show_post_t")());

    }

  });

  var app = new Router();
  Backbone.history.start();

});
