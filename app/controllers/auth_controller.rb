class AuthController < ApplicationController

    def login 
        user = User.find_by(email: params[:email])
        if user && user.authenticate(params[:password])
            session[:user_id] = user.id
            # Set session cookie with user id
            response.set_cookie(:session, {
                value: session.id,
                expires: 1.hour.from_now,
                path: '/api',
                httponly: true
            })
            render json: {user: user}
        else 
            render json: {
                error: 'Username or password incorrect.'
            }
        end
    end

    # If user has already logged in and cookie has not expired, automatically log in
    def auto_login
        if logged_in? && current_user
            render json: {user: current_user}
        else 
            render json: {error: "No user found."}
        end 
    end 

    def logout 
        session.clear
    end 

end
