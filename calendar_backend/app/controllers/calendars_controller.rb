# frozen_string_literal: true

class CalendarsController < ApplicationController
  def show
    begin
      calendar = Calendar.find_by(user_id: @user.id)
      puts "Found calendar! #{calendar}"
      render json: CalendarSerializer.new(calendar).to_serialized_json, status: :created
    rescue ActiveRecord::RecordNotFound => invalid
      puts "No calendar for user #{@user.id}"
      render json: {
        errors: { message: 'Calendar not found!', errors: invalid }
      }
    end
  end
end
