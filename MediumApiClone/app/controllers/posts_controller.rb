class PostsController < ApplicationController
  before_action :set_post, only: [:show, :update]
  before_action :authenticate, only: [:create, :update]
  before_action :set_user, only: :post_index

  # GET /posts
  # GET /posts.json
  def index
    @user = User.find(params[:user_id])
    if @user
      @posts = Post.where("public is NULL").where(:user_id => @user.id, "public is NOT NULL")
    else
      @posts = Post.where("public is NULL")
    end
  end

  def post_index
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
  end

  # POST /posts
  # POST /posts.json
  def create
    @post = Post.new(post_params.merge(user_id: params[:user_id]))

    respond_to do |format|
      if @post.save
        format.json { render :show, status: :created, location: @post }
      else
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    respond_to do |format|
      if @post.update(post_params)
        format.json { render :show, status: :ok, location: @post }
      else
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    def set_user
      @user = User.find(params[:user_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit(:title, :content, :public)
    end
  protected
    def authenticate
      authenticate_token || render_unauthorized
    end
    def authenticate_token
      authenticate_or_request_with_http_token('posts') do |token, options|
        User.find_by(auth_token: token)
      end
    end
    def render_unauthorized
      self.headers['WWW-Authenticate'] = 'Token realm="posts"'
      respond_to do |format|
        format.json { render json: 'Bad credentials', status: 401 }
      end
    end
end
