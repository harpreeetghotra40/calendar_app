class EventsController < ApplicationController
  def index
    # events = Event.where(:calendar_id => params[:calendar_id])
    # byebug
    render json: EventSerializer.new(Event.all).to_serialized_json
  end

  def create
    updatedTime = DateTime.parse(params[:event_time])
    event = Event.create!(title: params[:title], description: params[:description], calendar_id: 1, event_time: updatedTime)
    render json: EventSerializer.new(event).to_serialized_json
  end
end
