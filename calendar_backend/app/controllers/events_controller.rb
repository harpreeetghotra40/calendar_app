class EventsController < ApplicationController
  def index
    events = Event.where(:calendar_id => params[:id])
    render json: EventSerializer.new(events).to_serialized_json
  end

  def create
    updatedTime = DateTime.parse(params[:event_time])
    event = Event.create!(name: params[:name], description: params[:description], calendar_id: 1, event_time: updatedTime)
    render json: EventSerializer.new(event).to_serialized_json
  end
end
