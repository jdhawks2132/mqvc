Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  devise_for :users,
             controllers: {
               registrations: 'users/registrations',
               sessions: 'users/sessions',
             }

  get '/administrator_details', to: 'administrators#index'

  namespace :api do
    namespace :v1 do
      resources :contacts
      resources :vendors
    end
  end
end
