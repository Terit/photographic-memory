class SetDefaultHashtag < ActiveRecord::Migration
  def change
    remove_column :leaders, :hashtag
    add_column :leaders, :hashtag, :string, :default => "popular"
  end
end
