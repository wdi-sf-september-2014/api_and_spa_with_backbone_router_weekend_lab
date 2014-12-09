Rails.application.routes.draw do
  resources :users, except: [:new, :edit], constraints: { subdomain: 'api' } do
    resources :posts, except: [:new, :edit, :index]
  end
  resources :posts, except: [:new, :edit], constraints: { subdomain: 'api' }
  post '/users/login' => 'users#attempt_login', constraints: { subdomain: 'api' }
  get '/users/:user_id/posts' => 'posts#post_index', as: :post_index
end
