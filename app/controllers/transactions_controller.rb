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
        user_id = params[:id]
        ticker_symbol = params[:ticker].upcase
        quantity = params[:quantity]
        price_not_found = false
        begin
            price = client.price(ticker_symbol)
        rescue NameError
            price_not_found = true
        end
        if price_not_found
            render json: {error: "Ticker symbol not found."}
        else 
            stock_name = client.company(ticker_symbol).company_name
            total_price = price * quantity.to_i
            transaction = Transaction.create(user_id: user_id, stock_name: stock_name, ticker_symbol: ticker_symbol, quantity: quantity, current_price_per_share: price, total_price: total_price)
            render json: {transaction: transaction}
        end

    #     t.bigint "user_id", null: false
    # t.string "stock_name"
    # t.string "ticker_symbol"
    # t.integer "quantity"
    # t.decimal "current_price_per_share", precision: 12, scale: 6
    # t.decimal "total_price"
        
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
