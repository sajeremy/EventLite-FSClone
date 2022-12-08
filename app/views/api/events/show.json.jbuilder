# frozen_string_literal: true

json.event do
    json.extract! @event, :id, :title, :body, :address, 
    :start_datetime, :end_datetime, :capacity, :ticket_price, 
    :category, :created_at, :updated_at
  end
  