class UsersController < ApplicationController

    def signup
        user = User.create(user_params)
        user.account_balance = 5000
        user.save
        render json: user
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
