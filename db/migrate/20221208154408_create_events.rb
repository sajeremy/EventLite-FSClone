class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.string :address, null: false
      t.float :lat_location
      t.float :lng_location
      t.datetime :start_datetime, null: false
      t.datetime :end_datetime, null: false
      t.integer :capacity, null: false
      t.float :ticket_price, null: false
      t.string :category, null: false
      t.references :organizer, null: false, index: true, foreign_key: {to_table: :users}


      t.timestamps
    end
  end
end
