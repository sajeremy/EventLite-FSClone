class CreateLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :likes do |t|
      t.references :event, null: false, index: true, foreign_key: {to_table: :events}
      t.references :user, null: false, index: true, foreign_key: {to_table: :users}
      t.timestamps
    end
    add_index :likes, [:event_id, :user_id], unique: true
  end
end
