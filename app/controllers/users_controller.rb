class UsersController < ApplicationController

    before_action :authenticate_user, except: [:signup]

    def signup
        user = User.new(user_params)
        user.account_balance = 5000
        if user.save
            render json: user
        else 
            errors = user.errors.full_messages
            parsed_errors = errors.join(", ")
            render json: {error: "Signup errors: " + parsed_errors}
        end
    end 
    
    def index
        users = User.all 
        render json: users
    end

    def portfolio
        user = User.find(params[:id])
        render json: user.portfolio
    end 

    def transactions
        user = User.find(params[:id])
        transactions = user.transactions
        render json: transactions
    end

    private

    def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end 

end
