class Game  < ActiveRecord::Base
  belongs_to :user
  has_many :pictures
  has_one :score
end
