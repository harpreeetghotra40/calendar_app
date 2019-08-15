class RemoveEventIdFromCalendars < ActiveRecord::Migration[6.0]
  def change

    remove_column :calendars, :event_id, :integer
  end
end
