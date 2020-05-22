Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  scope '/api' do
    # Placeholder routes 
    get '/users', to: 'users#index'
    get '/transactions', to: 'transactions#index'
    
    # Real routes
    post '/signup', to: 'users#signup'
  end

  # Placeholder route for testing
  get '/stock-price', to: 'transactions#view_stock_price'
end
