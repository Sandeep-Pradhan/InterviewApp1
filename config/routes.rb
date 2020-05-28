Rails.application.routes.draw do
  resources :interviews
  get 'home/index'
  root to: 'interviews#index'
  
  resources :participants
end
