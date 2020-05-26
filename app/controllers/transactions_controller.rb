class TransactionsController < ApplicationController

    def create 

        # Authentication of IEX client library - possibly move into initializer
        client = IexClientWrapperController.new.client

        # Set the transaction variables from params
        user_id = params[:id]
        user = User.find(user_id)
        ticker_symbol = params[:ticker].upcase
        quantity = params[:quantity]

        # Check to see if the ticker symbol is valid
        price_not_found = false
        begin
            price = client.price(ticker_symbol)
        rescue NameError
            price_not_found = true
        end
        if price_not_found
            render json: {error: "Ticker symbol not found."}
        
        # If ticker symbol is valid, make sure the user has enough money in their account, set the rest of the transaction variables, and create a new transaction
        else 
            stock_name = client.company(ticker_symbol).company_name
            total_price = price * quantity.to_i
            if user.account_balance < total_price # Check to make sure the user has enough money
                render json: {error: "You don't have enough money in your account!"}
            else 
                transaction = Transaction.create(user_id: user_id, stock_name: stock_name, ticker_symbol: ticker_symbol, quantity: quantity, current_price_per_share: price, total_price: total_price)
                new_account_balance = user.account_balance - total_price # Decrement the user's account balance by the amount of the transaction
                user.update_attribute(:account_balance, new_account_balance)
                render json: {transaction: transaction, balance: user.account_balance}
            end 
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
