class Leader < ActiveRecord::Base

  validates :name, presence: true, length: { maximum: 3 }
  validates :score, presence: true

  after_initialize :check_hashtag

  private
    def check_hashtag
      unless hashtag
        self.update(hashtag: 'popular')
      end
      self.save
    end

end