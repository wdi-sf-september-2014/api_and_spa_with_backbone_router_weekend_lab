var postSource;
var	postShowTemplate;
var	newPostSource;
var	newPostTemplate;

$(document).ready(function(){
	// Post display template
	postSource = $("#show-posts-template").html();
	postShowTemplate = Handlebars.compile(postSource);

	// Write new post template
	// newPostSource = $("#write-post-template").html();
	// newPostTemplate = Handlebars.compile(newPostSource);
});

// Set up Backbone's routes
var Router = Backbone.Router.extend({
	routes: {
		"index":"index",
		"new":"new"
	}
});

var router = new Router;

function getPosts(){
	$.ajax({
		url: "http://localhost:3000/posts.json",
		type: "GET",
		success: function(data){
			var html = postShowTemplate({postData: data});
			$("#content").html(html);
			alert("it worked");
		},
		error: function(){
			alert("Something's not right");
		}
	});
}

router.on("route:index", getPosts);

// router.on("route:new", function(){
// 	$.ajax({
// 		url: "http://localhost:3000/posts/new",
// 		type: "POST",
// 		success: function(data){
// 			var html = newPostTemplate(data);
// 			$('#content').html(html);
// 		},
// 		error: function(){
// 			alert("Something's not right");
// 		}
// 	});
// });

Backbone.history.start();