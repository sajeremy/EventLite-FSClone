class ChangeEvents < ActiveRecord::Migration[7.0]
  def change
    change_column :events, :ticket_price, :decimal
  end
end
