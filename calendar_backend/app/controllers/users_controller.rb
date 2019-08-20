# frozen_string_literal: true

class UsersController < ApplicationController
  skip_before_action :authorized, only: [:create]

  def login
    byebug
  end

  def create
    begin
      user = User.create!(user_params)
      token = encode_token(user_id: user.id)
      render json: {
        jwt: token,
        username: user.name,
      }, status: :created
    rescue ActiveRecord::RecordInvalid => invalid
      render json: {
        errors: {
          message: "user info not valid!",
          errors: invalid,
        },
      }, status: :unauthorized
    end
  end

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
