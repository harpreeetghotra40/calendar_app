class Calendar < ApplicationRecord
  belongs_to :user
  # belongs_to :event
  has_many :events
end
