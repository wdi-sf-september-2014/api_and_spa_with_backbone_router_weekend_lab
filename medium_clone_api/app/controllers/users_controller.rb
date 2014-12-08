class UsersController < ApplicationController
  def create
    if @user = User.create(user_params)
      render "users/show", status: :created
    end
  end

  def login
  end

  private
  def user_params
    params.require(:user).permit([:first, :last, :email, :password])
  end
end
