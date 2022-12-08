class ChangeEventsDecimal < ActiveRecord::Migration[7.0]
  def change
    change_column :events, :ticket_price, :decimal, precision: 5, scale: 2
  end
end
