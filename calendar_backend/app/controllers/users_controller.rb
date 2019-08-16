class UsersController < ApplicationController
  def show
    begin
      user = User.find(params[:id])
      render json: user, only: [:name, :email]
    rescue ActiveRecord::RecordNotFound => invalid
      render json: { errors: ["user not found", invalid] }
    end
  end
end
