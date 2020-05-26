class User < ApplicationRecord

    # Validations for user attributes
    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP } 
    validates :password, presence: true, length: { minimum: 6 }
    validates :first_name, presence: true 
    validates :last_name, presence: true

    has_many :transactions

    has_secure_password

    # Aggregate the transactions into a portfolio of stocks with current total market value of shares
    def portfolio
        # Initialize a client for the IEX API
        client = IexClientWrapperController.new.client

        # Get an array of hashes where each hash is a stock with attributes: ticker_symbol, company_name, quantity (# of shares), total_value (quantity * current price per share)
        stocks_array = add_total_value_key_to_stock_hash(transactions_grouped_by_company, client)
    
        # Add whether or not the stock price is up from the day open to each stock hash
        add_day_open_info_to_stock_hash(stocks_array, client)
    end

    # Group the transactions by company in a hash where the key is the company ticker symbol, add the number of shares owned for each stock (if there are multiple transactions for a stock), transform into an array of hashes 
    # Return value is a hash where each hash is a stock with keys: ticker_symbol, company_name, quantity (# of shares)
    def transactions_grouped_by_company
        quantity_of_stocks_array = self.transactions.group_by{|transaction| transaction.ticker_symbol}.values.map{|transactions| [transactions[0].slice(:ticker_symbol, :stock_name), transactions.map{|transaction| transaction.quantity }.reduce(:+)]}
        quantity_of_stocks_array.map{|item| item[0].merge!({"quantity": item[1]})}
    end 

    # Add the total current value of the shares based on current stock price to each stock hash in the array
    # Return value is a hash where each hash is a stock with keys: ticker_symbol, company_name, quantity (# of shares), total_value (quantity * current price per share)
    def add_total_value_key_to_stock_hash(grouped_stocks_array, client)
        grouped_stocks_array.map{|stock| stock.merge!({"total_value": (client.price(stock[:ticker_symbol]) * stock[:quantity])})}
    end

    # Add "higher", "lower", or "equal" as an entry in the hash with key "day_status" depending on whether the current stock price is higher, lower, or equal to open price
    # Return value is a hash where each hash is a stock with keys: ticker_symbol, company_name, quantity (# of shares), total_value (quantity * current price per share), day_status
    def add_day_open_info_to_stock_hash(grouped_stocks_array, client)
        grouped_stocks_array.map do |stock| 
            ohlc = client.ohlc(stock[:ticker_symbol]) # Gets the open, high, low, close for a given stock. See ruby client documentation for more info: https://github.com/dblock/iex-ruby-client#get-a-ohlc-open-high-low-close-price
            
            # Official open price is available is 9:45am ET or later, so if you access earlier than this, set open_price variable to the previous close price (should set status to equal and appear grey on frontend)
            begin
                open_price = ohlc.open.price unless open_price=nil
            rescue
                open_price = client.price(stock[:ticker_symbol])
            else 
                open_price = client.price(stock[:ticker_symbol])
            end
            
            # Compare the current price to the open price if available, otherwise set to "equal"
            begin 
                if client.price(stock[:ticker_symbol]) < open_price # Set day_status attribute as lower if current price is lower than current open price
                    day_status = "lower"
                elsif client.price(stock[:ticker_symbol]) > open_price # Set day_status attribute as higher if current price is higher than open price
                    day_status = "higher"
                else # Set day_status attribute as equal if current price is equal to open price
                    day_status = "equal"
                end 
            rescue 
                day_state = "equal"
            end
            stock.merge!({"day_status": day_status})
        end
    end 
end


