class User < ApplicationRecord

    has_many :transactions

    has_secure_password


    # Aggregate the transactions into a portfolio of stocks with current total market value of shares
    def portfolio
        quantity_of_stocks_array = self.transactions.group_by{|transaction| transaction.ticker_symbol}.values.map{|transactions| [transactions[0].slice(:ticker_symbol, :stock_name), transactions.map{|transaction| transaction.quantity }.reduce(:+)]}
        quantity_of_stocks_hash = quantity_of_stocks_array.map{|item| item[0].merge!({"quantity": item[1]})}

        client = IEX::Api::Client.new(
            publishable_token: ENV['IEX_API_PUBLISHABLE_TOKEN'],
            secret_token: ENV['IEX_API_SECRET_TOKEN'],
            endpoint: 'https://sandbox.iexapis.com/stable'
            )
        
        # Add the total current value of the shares based on current stock price
        stocks_quantity_current_total_value = quantity_of_stocks_hash.map{|stock| stock.merge!({"total_value": (client.price(stock[:ticker_symbol]) * stock[:quantity])})}
    
        # Add whether or not it is up from the day open
        stocks_quantity_total_up_down = stocks_quantity_current_total_value.map do |stock| 
            ohlc = client.ohlc(stock[:ticker_symbol]) # Gets the open, high, low, close for a given stock. See ruby client documentation for more info: https://github.com/dblock/iex-ruby-client#get-a-ohlc-open-high-low-close-price
            if client.price(stock[:ticker_symbol]) < ohlc.open.price # set day_status attribute as lower if current price is lower than current open price
                day_status = "lower"
            elsif client.price(stock[:ticker_symbol]) > ohlc.open.price # set day_status attribute as higher if current price is higher than open price
                day_status = "higher"
            else # set day_status attribute as equal if current price is equal to open price
                day_status = "equal"
            end 
            stock.merge!({"day_status": day_status})
        end

    end
end


