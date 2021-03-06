# frozen_string_literal: true

class Event < ApplicationRecord
  belongs_to :calendar
  validates :title, presence: true
  validates :event_time, presence: true
  # def as_json(options={})
  #   super(:)
  # end
end
