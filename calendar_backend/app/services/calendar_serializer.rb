# frozen_string_literal: true

class CalendarSerializer
  def initialize(calendar_object)
    @calendar = calendar_object
  end

  def to_serialized_json
    @calendar.to_json(
      include: {
        events: {
          only: [:name, :description, :event_time]
        }
      },
      except: [:updated_at, :created_at, :id, :user_id]
    )
  end
end
