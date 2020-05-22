class UsersController < ApplicationController

    def signup
        user = User.create(user_params)
        render json: user
    end 
    
    def index
        users = User.all 
        render json: users
    end

    private

    def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :password_digest, :password_confirmation)
    end 

end
