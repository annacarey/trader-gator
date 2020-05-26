class IexClientWrapperController < ApplicationController

    # Initial the Ruby IEX client - documentation here: https://github.com/dblock/iex-ruby-client
    def client 
        client = IEX::Api::Client.new(
            publishable_token: ENV['IEX_API_PUBLISHABLE_TOKEN'],
            secret_token: ENV['IEX_API_SECRET_TOKEN'],
            endpoint: 'https://sandbox.iexapis.com/stable'
            )
    end 
end
