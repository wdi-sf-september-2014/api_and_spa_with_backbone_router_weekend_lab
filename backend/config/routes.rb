Rails.application.routes.draw do
  constraints subdomain: 'api' do
    namespace :api do
      resources :comments
      resources :posts
      resources :users
    end
  end
end
