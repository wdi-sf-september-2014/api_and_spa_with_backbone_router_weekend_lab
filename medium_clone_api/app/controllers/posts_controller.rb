class PostsController < ApplicationController
  def create
    if @post = Post.create(post_params)
      respond_with @post
    else
      respond_with @post.errors
    end
  end

  def show
    @post = Post.find_by_id(params[:id])
    if @post 
      respond_with @post
    else
      head 404
    end
  end

  def index
    @posts = Post.all
  end

  private
  def post_params
    require(:post).permit([:title, :content, :user_id])
  end
end
