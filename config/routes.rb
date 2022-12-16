Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  devise_for :users,
             controllers: {
               registrations: 'users/registrations',
               sessions: 'users/sessions',
             }

  get '/hello', to: 'application#hello'

  namespace :api do
    namespace :v1 do
      resources :contacts
      resources :vendors
      get '/me', to: 'members#me'
    end
  end
end
