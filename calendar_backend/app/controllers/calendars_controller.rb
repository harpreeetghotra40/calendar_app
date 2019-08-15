class CalendarsController < ApplicationController
  def show
    calendar = Calendar.find(params[:id])
    if calendar
      render json: CalendarSerializer.new(calendar).to_serialized_json
    else
      render json: { message: "Calendar not found!" }
    end
  end
end
