class CreateGameTable < ActiveRecord::Migration
  def change
    create_table  :games do |t|
      t.index     :user_id
      t.index     :picture_id
      t.index     :score_id
      t.timestamps
    end
  end
end
