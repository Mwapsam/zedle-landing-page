class Api::SessionsController < ApplicationController
    def create
      @user = User.find_by_credentials(
        params[:user][:email], 
        params[:user][:password]
      )
      
      if @user
        login!(@user)
        render json: @user, status: 200
      else
        render json: ['Incorrect username/password combo. Please try again.'], status: 401
      end
    end
  
    def destroy
      if current_user
        logout!
        render json: {}
      else
        render json: ["No currently logged in user"], status: 401
      end
    end
end