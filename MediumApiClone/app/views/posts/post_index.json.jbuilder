json.extract! @user, :id, :first, :last, :email
json.array!(@user.posts) do |post|
  json.extract! post, :id, :title, :content, :public
end