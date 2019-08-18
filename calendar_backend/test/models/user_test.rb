require "test_helper"

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  test "has at least a user" do
    assert User.all.length > 0
    assert_not_nil User.first.name
  end
end
