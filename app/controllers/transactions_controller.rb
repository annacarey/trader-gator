class TransactionsController < ApplicationController

    def index
        transactions = Transaction.all 
        render json: transactions
    end

    def create 
        client = IEX::Api::Client.new(
            publishable_token: ENV['IEX_API_PUBLISHABLE_TOKEN'],
            secret_token: ENV['IEX_API_SECRET_TOKEN'],
            endpoint: 'https://sandbox.iexapis.com/stable'
            )
        ticker = params[:ticker]
        quantity = params[:quantity]
        price_not_found = false
        begin
            price = client.price(ticker)
        rescue NameError, Faraday::Error::ResourceNotFound
            price_not_found = true
        end
        if price_not_found
            render json: {error: "Ticker symbol not found."}
        else 
            render json: {price: price}
        end
        
    end


    # Testing out the connection to API
    # Using dB's IEX Ruby Client - https://github.com/dblock/iex-ruby-client
    def view_stock_price
        client = IEX::Api::Client.new(
            publishable_token: ENV['IEX_API_PUBLISHABLE_TOKEN'],
            secret_token: ENV['IEX_API_SECRET_TOKEN'],
            endpoint: 'https://sandbox.iexapis.com/stable'
            )
        price = client.price('MSFT')
        render json: price
    end 
    
end
