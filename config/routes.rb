Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post 'api/test', to: 'application#test' # for testing authentication
  
  namespace :api, defaults: { format: :json } do
    resources :users, only: :create
    resource :session, only: [:show, :create, :destroy]
    resources :events, only: [:index, :create, :update, :destroy]
    resources :events, only: [:show] do 
      resources :tickets, only: [:create]
    end
    resources :tickets, only: [:index, :show, :destroy]
    

  end
  get '*path', to: "static_pages#frontend_index"
end
