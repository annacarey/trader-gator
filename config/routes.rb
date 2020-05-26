Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  scope '/api' do
    # Placeholder routes for deletion
    get '/users', to: 'users#index'
    
    # User routes
    post '/signup', to: 'users#signup'
    get '/:id/portfolio', to: 'users#portfolio'
    get '/:id/transactions', to: 'users#transactions'


    # Transaction route
    post '/purchase', to: 'transactions#create'

    # Session routes
    post '/login', to: 'auth#login'
    get '/auto_login', to: 'auth#auto_login'
    delete '/logout', to: 'auth#logout'

  end

  # Placeholder route for testing
  get '/stock-price', to: 'transactions#view_stock_price'
end
