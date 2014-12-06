$(document).ready(function() {
  //setting up backbone's routes
  var Router = Backbone.Router.extend({
    routes: {
      "signup":"signup",
      "login":"login",
      "posts/new":"add_post",
      "posts/:id":"view_post",
      "posts/:id/edit":"edit_post",
      "posts":"index"
    }
  });

  var router = new Router;

  function getposts() {
      //Pull all products from the API
      $.ajax({
      url: "http://api.MediumApiClone.dev/posts.json",
      type: "GET",
      success: function(data) { 
        var source = $("#posts").html();

        var template = Handlebars.compile(source);

        var html = template({postData: data});

        $("#container").html(html);
      },
      error: function(jqXHR, textStatus, errorThrown) { 
        alert("something went wrong");
        console.log(errorThrown);
      }
    });
  }

  router.on("route:index", getposts)

  // $.ajaxSetup({
  //   headers: { 'Authorization' :'Token token= ' + sessionStorage.getItem(auth_token) }
  // });


  router.on("route:signup", function () {
    $("#create-account-modal").modal("show");
  });

  router.on("route:login", function () {
    $("#login-modal").modal("show");
  });

  router.on("route:view_post", function(id) {
    $.ajax({
    url: "http://api.MediumApiClone.dev/posts/" + id,
    type: "GET",
    headers: { 'Authorization' :'Token token= ' + sessionStorage.getItem("auth_token") },
    success: function(data) { 
        var source = $("#viewpost").html();

        var template = Handlebars.compile(source);

        var html = template({postData: data});

        $("#container").html(html);
    },
    error: function(jqXHR, textStatus, errorThrown) { 
            alert("something went wrong");
            console.log(errorThrown);
        }
    });
  });

  router.on("route:edit_post", function(id) {
    $.ajax({
    url: "http://api.MediumApiClone.dev/posts/" + id,
    type: "GET",
    headers: { 'Authorization' :'Token token= ' + sessionStorage.getItem("auth_token") },
    success: function(data) { 
        var source = $("#edit_post").html();

        var template = Handlebars.compile(source);

        var html = template({postData: data});

        $("#container").html(html);
    },
    error: function(jqXHR, textStatus, errorThrown) { 
            alert("something went wrong");
            console.log(errorThrown);
        }
    });
  });

  Backbone.history.start();

  $(document).on("click", "#new_post", function(){
    $.ajax({
      url: "http://api.MediumApiClone.dev/posts",
      type: "POST",
      headers: { 'Authorization' :'Token token= ' + sessionStorage.getItem("auth_token") },
      data: {
        posts: {
          title: $("#title").val(),
          content:  $("#content").val()
        }
      },
      success: function(){
        getposts();
      },
      error: function() {
        alert("Something went wrong adding a post");
      }
    });
  });

  $(document).on("click", ".submitedit", function (event) {
        $.ajax({
        url: "http://api.MediumApiClone.dev/posts/" + event.target.id,
        type: "PUT",
        headers: { 'Authorization' :'Token token= ' + sessionStorage.getItem("auth_token") },
        data: {
          posts: {
            title: $("#title").val(),
            content:  $("#content").val()
        }
      },
        success: function(data) { 
            window.location.href=""
        },
        error: function(jqXHR, textStatus, errorThrown) { 
                alert("something went wrong updating a post");
                console.log(errorThrown);
            }
        });
    });
  $(document).on("click", "#signup", function(){
      $.ajax({
        url: "http://api.MediumApiClone.dev/users",
        type: "POST",
        data: {
          user: {
            first: $("#add-first").val(),
            last: $("#add-last").val(),
            email: $("#add-email").val(),
            password: $("#add-password").val()
          }
        },
        success: function(data){
          $("#create-account-modal").modal("hide");
          sessionStorage.setItem("auth_token", data.auth_token);
          getposts();
        },
        error: function() {
          alert("Something went wrong adding a user");
        }
      });
    });
  $(document).on("click", "#login", function(){
      $.ajax({
        url: "http://api.MediumApiClone.dev/users",
        type: "GET",
        data: {
          user: {
            email: $("#check-email").val(),
            password: $("#check-password").val()
          }
        },
        success: function(data){
          $("#login-modal").modal("hide");
          sessionStorage.setItem("auth_token", data.auth_token);
          getposts();
        },
        error: function() {
          alert("Something went wrong adding a user");
        }
      });
    });
});