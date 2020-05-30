require 'sidekiq/web'

Rails.application.routes.draw do
  resources :interviews
  resources :participants

  root to: 'home#index'
  match '*path', to: 'home#index', via: :all
  mount Sidekiq::Web => '/sidekiq'
end
