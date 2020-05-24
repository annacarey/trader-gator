class UsersController < ApplicationController

    def signup
        user = User.new(user_params)
        if user.save
            user.account_balance = 5000
            render json: user
        else 
            errors = user.errors.full_messages
            render json: {error: errors}
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

    private

    def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end 

end
