Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  scope '/api' do
    resources :users, :transactions
  end

  get '/stock-price', to: 'transactions#view_stock_price'
end
