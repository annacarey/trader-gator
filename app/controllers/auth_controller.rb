class AuthController < ApplicationController

    def login 
        user = User.find_by(email: params[:email])
        if user && user.authenticate(params[:password])
            session[:user_id] = user.id
            response.set_cookie(:session, {
                value: session.id,
                expires: 1.hour.from_now,
                path: '/api',
                httponly: true
            })
            render json: {message: "Logged in", user: user}
        else 
            render json: {
                error: 'Username or password incorrect'
            }
        end
    end


end
