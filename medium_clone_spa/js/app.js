var source   = $("#posts_template").html();
var template = Handlebars.compile(source);

$.ajax( "http://api.medium-clone-api.dev/posts.json", {
  complete: function( data ) {
    $('#posts').html(template({posts: data.responseJSON}));
  }
});
