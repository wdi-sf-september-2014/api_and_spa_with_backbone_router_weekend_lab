json.extract! @user, :id, :first, :last, :email, :auth_token, :created_at, :updated_at

json.users @user.posts, :title, :body, :created_at