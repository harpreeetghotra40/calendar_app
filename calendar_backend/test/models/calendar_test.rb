# frozen_string_literal: true

require 'test_helper'

class CalendarTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  test 'has a calendar' do
    puts Calendar.all.first.as_json
    assert !(Calendar.all.empty?)
  end
end
