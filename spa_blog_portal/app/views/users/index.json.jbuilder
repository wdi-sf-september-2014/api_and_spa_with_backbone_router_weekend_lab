json.array!(@users) do |user|
  json.extract! user, :id, :first, :last, :email, :auth_token
  json.url user_url(user, format: :json)
  json.user user.posts, :title, :body, :created_at
end
