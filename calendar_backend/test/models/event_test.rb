# frozen_string_literal: true

require 'test_helper'

class EventTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  test 'has at least one event' do
    assert !(Event.all.empty?)
    assert_not_nil Event.first.title
  end

  test 'cannot create empty event' do
    assert_raise do
      Event.create!
    end
    assert_raise do
      Event.create!(calendar: Calendar.first)
    end
  end

  test 'cannot create partial event' do
    assert_raise do
      Event.create!(title: 'fart')
    end

    assert_raise do
      Event.create!(
        title: 'Fart',
        description: 'fart',
        calendar: Calendar.first
      )
    end

    assert_raise do
      Event.create!(event_time: 'hmph')
    end

    assert_raise do
      Event.create!(event_time: 'hmph', calendar: Calendar.first)
    end
  end

  test 'can create reasonable event' do
    assert_nothing_raised do
      new_event = Event.create!(
        title: 'hello days',
        event_time: '2019-08-16T20:32:19.375Z',
        calendar: Calendar.first
      )
      assert_not_nil new_event.title
    end
  end

  test 'cannot delete nonsense event ID' do
    result = Event.delete(2342342342)
    assert(result == 0)
  end

  test 'can delete event' do
    assert_nothing_raised do 
      new_event = Event.create!(
        title: 'hello days',
        event_time: '2019-08-16T20:32:19.375Z',
        calendar: Calendar.first
      )
      new_event.delete
    end
  end
end
