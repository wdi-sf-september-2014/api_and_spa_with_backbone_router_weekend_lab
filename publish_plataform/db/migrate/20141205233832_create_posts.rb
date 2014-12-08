class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.text :content
      t.boolean :is_public
      t.references :user

      t.timestamps
    end
  end
end
