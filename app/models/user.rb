class User < ApplicationRecord

    has_many :transactions


    # Aggregate the transactions into a portfolio of stocks with current total market value of shares
    def portfolio

        # Get all of a user's transactions into a hash with the ticker_symbol as the key and the value is an array of transactions for that stock
        transaction_hash = self.transactions.group_by{|transaction| transaction.ticker_symbol}
        
        # Transform the hash into an array with a key value pair, map the array (value) into an array of just the quantity, add the quantities, and then transform back into a hash (key is ticker symbol and value is total quantity of shares owned)
        stocks_with_total_quantity_of_shares = transaction_hash.map {|key, value| [key, value.map{|transaction| transaction.quantity }.reduce(:+)]}.to_h

        # Loop through the hash and update the values based on the stock's current value (by making API call)
        client = IEX::Api::Client.new(
            publishable_token: ENV['IEX_API_PUBLISHABLE_TOKEN'],
            secret_token: ENV['IEX_API_SECRET_TOKEN'],
            endpoint: 'https://sandbox.iexapis.com/stable'
            )
        stocks_with_total_quantity_of_shares.map{|ticker, quantity| [ticker, client.price(ticker)*quantity]}.to_h

    end

end
