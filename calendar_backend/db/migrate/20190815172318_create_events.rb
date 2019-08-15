class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :title
      t.string :description
      t.datetime :event_time
      t.references :calendar, null: false, foreign_key: true

      t.timestamps
    end
  end
end
