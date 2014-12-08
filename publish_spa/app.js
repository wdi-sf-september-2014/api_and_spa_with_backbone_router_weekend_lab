//Global Variables to be used
var newtoken;
var user;
var postSource; 
var postShowTemplate;
var singlePostSource;
var singlePostTemplate;
var newUserSource;
var newUserTemplate;
var loginSource;
var loginTemplate;
var writePostSource;
var writePostTemplate;


//Preview Blog posts
Handlebars.registerHelper('trimString', function(passedString) {
    var theString = passedString.substring(0,300);
    return new Handlebars.SafeString(theString)
});



//Get templates to use in SPA
$(document).ready(function(){
	// if ((sessionStorage).length == 1){
	// 	 user = sessionStorage.key(0)
	// };
	postSource = $("#get-posts").html();
	postShowTemplate = Handlebars.compile(postSource);
	newUserSource = $("#create-user-form").html();
	newUserTemplate = Handlebars.compile(newUserSource);
	loginSource = $("#login-form").html();
	loginTemplate = Handlebars.compile(loginSource);
	writePostSource = $("#write-post-form").html();
	writePostTemplate = Handlebars.compile(writePostSource);
	singlePostSource = $("#single-post-form").html();
	singlePostTemplate = Handlebars.compile(singlePostSource);
});


//Set Up Routes
var Router = Backbone.Router.extend({
	routes: {
		"":"index",
		"signup": "signup",
		"login": "login",
		"posts/new": "newpost",
		"posts/:id": "singlepost"
	}
});

var router = new Router;


function getPosts () {
		$.ajax({
		url: "http://lg-publish.herokuapp.com/posts",
		type: "GET",
		success: function(datos) {
			var contents = [];
			datos.forEach(function(data){
				if (data.is_public) {
					contents.push(data)
				}
			});
			viewable = postShowTemplate({Post: contents})
			$("#content").html(viewable);
		},
		error: function() {
			alert("something went wrong ..."); 
		}
	});
};

router.on("route:index", getPosts);

router.on("route:signup", function(){
	$("#content").html(newUserTemplate);
});

router.on("route:login", function(){
	$("#content").html(loginTemplate)
});

router.on("route:newpost", function(){
	$("#content").html(writePostTemplate);
});

router.on("route:singlepost", function(id){
	$.ajax({
		url: "http://lg-publish.herokuapp.com/posts/" + id,
		type: "GET",
		success: function(data){
			viewable = singlePostTemplate(data)
			$("#content").html(viewable);

		},
		error: function(){
			alert("something went wrong")
		}
	});

});


Backbone.history.start();




//Create new user
$(document).on("click", "#send_user", function(){
	$.ajax({
		url: "http://lg-publish.herokuapp.com/users",
		type: "POST",
		data: {
			user: {
				firstname: $("input[name=firstname]").val(),
				lastname: $("input[name=lastname]").val(),
				email: $("input[name=email]").val(),
				password:$("input[name=password]").val()
			}
		},
		success: function(data){
			newtoken = (data.auth_token);
			user = (data.id);
			sessionStorage.setItem(user, newtoken);
			window.location.href = "#posts/new";
		},
		error: function(){
			alert("something went wrong...")
		}
	});
});

//Publish new blog post

$(document).on("click", "#publish", function(){
	$.ajax({
		url: "http://lg-publish.herokuapp.com/posts",
		type: "POST",
		headers: {
			'Authorization': 'Token token=' + sessionStorage.getItem(user)
		},
		data: {
			post: 
			{
				title: $("input[name=title]").val(),
				content: $("textarea[name=post]").val(),
				is_public: true,
				user_id: user,
			}
		},
		success: function(){
			window.location.href = "#";
		},
		error: function(){
			alert("something went wrong...")
		}
	});
});

$(document).on("click", "#savelater", function(){
	$.ajax({
		url: "http://lg-publish.herokuapp.com/posts",
		type: "POST",
		headers: {
			'Authorization': 'Token token=' + sessionStorage.getItem(user)
		},
		data: {
			post: 
			{
				title: $("input[name=title]").val(),
				content: $("textarea[name=post]").val(),
				is_public: false,
				user_id: user,
			}
		},
		success: function(){
			window.location.href = "#";
		},
		error: function(){
			alert("something went wrong...")
		}
	});
});





