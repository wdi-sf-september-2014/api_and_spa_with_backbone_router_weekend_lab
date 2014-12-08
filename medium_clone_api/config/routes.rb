MediumCloneApi::Application.routes.draw do
  constraints subdomain: 'api' do
    resources :users, only: [:create] do
      resources :posts, except: [:new, :edit, :destroy]
    end

    get 'posts/index'
    post 'users/login'
  end

  root 'users#login'
end
