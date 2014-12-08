
  

  var postSource; 
  var postShowTemplate;

  var editPostSource;
  var editPostTemplate; 


$(document).ready(function() {
//Product display template
  postSource = $("#show-posts-template").html();
  postShowTemplate = Handlebars.compile(postSource);
//edit product template 
  editPostSource = $("#edit-post-template").html();
  editPostTemplate = Handlebars.compile(editPostSource);

});

var Router = Backbone.Router.extend({
  routes: {
      //alias is the word after the colon, just make it consistent on the below function "route:index"

      "index":"index",
      "edit/:id":"edit_post"
  }
});

var router = new Router; 

function getPosts () {
  //pull all posts from the api--was originally part of $(document).ready (see the old app_withoutbackbone.js file)

  $.ajax({
    url: "http://spa_blog_portal.dev/posts",
    type: "GET",
    success: function(data){
  
      var html = postShowTemplate({postData: data});

      //we push the html data into the div id="content"-see the index.html

      $("#content").html(html); 
    }, 
    error: function() {
      alert("Something went wrong");
    }
  });
}

router.on("route:index", getPosts);


router.on("route:edit_post", function(id){
  //pull all posts from the api--was originally part of $(document).on("click") (see the old app_withoutbackbone.js file
$.ajax({
    url: "http://spa_blog_portal.dev/posts" + id,
    type: "GET",
    success: function(data) {
     var html = editPostTemplate(data);
      $("#content").html(html);
           }, 
    error: function() {
      alert("Something went wrong");
     }
  });
});

Backbone.history.start();
//when user clicks the edit button...GET the post information first 

$(document).on("click", ".edit-button", function(){
  
});

//when user clicks on submit button after they have edited. 
$(document).on("click", "#submit-edits", function(){
  $.ajax({
    url: "http://spa_blog_portal.dev/posts" + $(this).attr("edit_id"),
    type: "PUT",
    data: {
      product: {
      title: $("input[name=title]").val(),
      body: $("input[name=body]").val()
      }
    },
    success: function(data){
      window.location.href = "#index";

    },
    error: function(){
      alert("Something went wrong!")
    }
  });

});

//when user wants to add a new post...

$(document).on("click", "#add-post", function(){
  $.ajax({
    url: "http://spa_blog_portal.dev/posts",
    type: "POST",
    data: {
      product: {

        // notice how we are are using the "id on the modal form instead of the "name" on the form as as seen on the above ajax syntax

        title: $("#add-title").val(),
        body: $("#add-body").val()
      }

    },
    success: function(){
      $("#add-post-modal").modal("hide");
      getProducts();

    },
    error: function(){
      alert("Something went wrong!")
    }

  });

});

//when a user wants to delete an item...

$(document).on("click", ".delete-button", function(){
  $.ajax({
    url: "http://spa_blog_portal.dev/posts" + $(this).attr("id"),
    type: "DELETE", 
    success: function(){
      // this will send them back to index using backbone
      window.location.href = "#index";
    },
    error: function(){
      alert("Something went wrong!")
    }
 });
});

