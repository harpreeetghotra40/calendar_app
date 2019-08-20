# frozen_string_literal: true

class UsersController < ApplicationController
  skip_before_action :authorized, only: [:create]
  def show
    begin
      user = User.find(params[:id])
      render json: user, only: [:name, :email]
    rescue ActiveRecord::RecordNotFound => invalid
      render json: {
        errors: {
          message: 'user not found',
          errors: invalid
        }
      }, status: :forbidden
    end
  end

  def create
    begin
      user = User.create!(user_params)
      token = encode_token(user_id: user.id)
      render json: {
        jwt: token
      }, status: :created
    rescue ActiveRecord::RecordInvalid => invalid
      render json: {
        errors: {
          message: 'user info not valid!',
          errors: invalid
        }
      }, status: :unauthorized
    end
  end

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
