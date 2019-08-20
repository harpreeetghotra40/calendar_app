# frozen_string_literal: true

class ApplicationController < ActionController::API
  # https://learn.co/tracks/module-4-web-development-immersive-2-1/auth/jwt-auth-in-rails/jwt-auth-rails
  before_action :authorized

  def encode_token(payload)
    # should store secret in env variable
    puts "WARNING: FIX THIS! Only temporary for proof-of-concept!"
    JWT.encode(payload, "my_s3cr3t")
  end

  def auth_header
    # { Authorization: 'Bearer <token>' }
    request.headers["Authorization"]
  end

  def decoded_token
    if auth_header
      token = auth_header.split(" ")[1]
      # header: { 'Authorization': 'Bearer <token>' }
      begin
        puts "WARNING: FIX THIS! Only temporary for proof-of-concept!"
        JWT.decode(token, "my_s3cr3t", true, algorithm: "HS256")
      rescue JWT::DecodeError
        nil
      end
    end
  end

  def current_user
    if decoded_token
      user_id = decoded_token[0]["user_id"]
      @user = User.find_by(id: user_id)
    end
  end

  def logged_in?
    !!current_user
  end

  def authorized
    if !(logged_in?)
      render json: {
               errors: {
                 message: "Please log in",
                 errors: [[:unauthorized.to_s]],
               },
               status: :unauthorized,
             }
    end
  end
end
