class CreateTickets < ActiveRecord::Migration[7.0]
  def change
    create_table :tickets do |t|
      t.references :events, null: false, index: true
      t.references :attendee, null: false, index: true, foreign_key: {to_table: :users}
      t.timestamps
    end
  end
end
