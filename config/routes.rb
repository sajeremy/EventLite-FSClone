Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post 'api/test', to: 'application#test' # for testing authentication
  
  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :show, :destroy]
    resources :users, only: :create
    
    resources :events, only: [:show] do 
      resources :tickets, only: [:create]
    end
    
    resources :tickets, only: [ :index, :show, :destroy]
    resources :events, only: [:index, :create, :update, :destroy]

    
  end
  get '*path', to: "static_pages#frontend_index"
end
