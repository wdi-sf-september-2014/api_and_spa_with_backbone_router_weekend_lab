class UsersController < ApplicationController
  def create
    if @user = User.create(user_params)
      render "users/show", status: :created
    end
  end

  def login
    @user = User.find_by_email_and_password(params[:email], params[:password])
    if @user
      @user.set_auth_token
      @user.save
      render "users/show", status: :ok
    end
  end

  private
  def user_params
    params.require(:user).permit([:first, :last, :email, :password])
  end
end
