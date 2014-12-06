json.array!(@posts) do |post|
  json.extract! post, :id, :headline, :body, :public
  json.url post_url(post, format: :json)
end
