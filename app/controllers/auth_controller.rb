class AuthController < ApplicationController

    def create 
        user = User.find_by(email: params[:email])
        
        if user && user.authenticate(params[:password])
            create_jwt = encode_token(user.id)
            cookies.signed[:jwt] = {value: create_jwt, httponly: true, expires: 1.hour.from_now}
            render json: {message: "Logged in", user: user}
        else 
            render json: {
                error: 'Username or password incorrect'
            }
        end
    end
end
