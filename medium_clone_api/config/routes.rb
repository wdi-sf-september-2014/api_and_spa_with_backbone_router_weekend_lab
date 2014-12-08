MediumCloneApi::Application.routes.draw do
  constraints subdomain: 'api' do
    resources :users, only: [:create]
    resources :posts, except: [:new, :edit, :destroy]

    get 'posts/index'
    post 'users/login'
  end

  root 'users#login'
end
