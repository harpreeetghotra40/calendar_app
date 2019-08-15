class UsersController < ApplicationController
  def show
    user = User.find(params[:id])
    if user
      render json: user, only: [:name, :email]
    else
      render json: { message: "user not found" }
    end
  end
end
