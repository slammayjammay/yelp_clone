# == Schema Information
#
# Table name: businesses
#
#  id           :integer          not null, primary key
#  name         :string           not null
#  rating       :float            default(0.0), not null
#  review_count :integer          default(0), not null
#  category     :string           not null
#  address      :string           not null
#  city         :string           not null
#  state        :string           not null
#  latitude     :float            not null
#  longitude    :float            not null
#  url          :string
#  phone        :string
#  image_url    :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'test_helper'

class BusinessTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
