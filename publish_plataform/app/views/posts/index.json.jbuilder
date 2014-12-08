json.array!(@posts) do |post|
  json.extract! post, :id, :title, :content, :is_public, :user_id, :created_at, :updated_at
  json.url post_url(post, format: :json)
end
