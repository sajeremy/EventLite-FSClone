Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post 'api/test', to: 'application#test' # for testing authentication
  
  namespace :api, defaults: { format: :json } do
    resources :users, only: :create
    resource :session, only: [:show, :create, :destroy]
    resources :events, only: [:create, :update, :destroy]
    resources :events, only: [:show]
    

  end
  get '*path', to: "static_pages#frontend_index"
end
