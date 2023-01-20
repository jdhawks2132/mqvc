require 'sidekiq/web'
Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  authenticate :user, lambda { |u| u.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end
  # Defines the root path route ("/")
  # root "articles#index"
  devise_for :users,
             controllers: {
               registrations: 'users/registrations',
               sessions: 'users/sessions',
             }

  get '/hello', to: 'application#hello'
  get '/me', to: 'members#me'
  get 'member-data', to: 'members#show'
  get '/admin-users', to: 'members#admin_users'
  namespace :api do
    namespace :v1 do
      resources :contacts
      resources :vendors
      resources :users, only: [:index]
      get '/vendors_by_assignment', to: 'vendors#vendors_by_assignment'
    end
  end

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
