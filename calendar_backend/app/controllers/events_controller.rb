class EventsController < ApplicationController
  def index
    # events = Event.where(:calendar_id => params[:calendar_id])
    # byebug
    render json: EventSerializer.new(Event.all).to_serialized_json
  end

  def create
    begin
      updatedTime = nil
      begin
         updatedTime = DateTime.parse(params[:event_time])
      rescue ArgumentError
        render json: {
          errors: {
            message: 'DateTime.parse raised ArgumentError. Are we passing a valid date to the backend?',
            errors: ArgumentError
            }
          }
          return
      end
        event = Event.create!(title: params[:title], description: params[:description], calendar_id: 1, event_time: updatedTime)
        # render json: EventSerializer.new(event).to_serialized_json
        render event.as_json(except: [:id, :calendar_id, :updated_at, :created_at])
        return
    rescue ActiveRecord::RecordInvalid => invalid
      render json: {errors: {message: "ActiveRecord::RecordInvalid!", errors: invalid.record.errors}}
    end
  end
end
