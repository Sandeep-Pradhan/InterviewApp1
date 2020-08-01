require 'sidekiq/web'

Rails.application.routes.draw do
  resources :interviews
  get 'home/index'
  root to: 'interviews#index'
  mount Sidekiq::Web => '/sidekiq'
  
  resources :participants
end
