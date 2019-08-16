class Event < ApplicationRecord
  belongs_to :calendar
  validates :title,  presence: true
  # def as_json(options={})
  #   super(:)
  # end
end
