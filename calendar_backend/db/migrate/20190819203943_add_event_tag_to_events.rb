class AddEventTagToEvents < ActiveRecord::Migration[6.0]
  def change
    add_column :events, :event_tag, :string
  end
end
