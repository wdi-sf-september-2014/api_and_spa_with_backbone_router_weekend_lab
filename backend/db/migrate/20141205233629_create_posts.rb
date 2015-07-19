class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :headline
      t.text :body
      t.boolean :public
      t.integer :user_id

      t.timestamps
    end
  end
end
