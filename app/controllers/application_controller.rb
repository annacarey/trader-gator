class ApplicationController < ActionController::Base

    protect_from_forgery with: :exception

    skip_before_action :verify_authenticity_token

    def authenticate_user
        logged_in?
    end

    def current_user
        User.find(session[:user_id]) if session[:user_id]
    end 

    def logged_in?
        current_user != nil
    end
    
end
