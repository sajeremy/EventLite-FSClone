# frozen_string_literal: true

json.event do
    json.photoUrl @event.photo.url
    json.extract! @event, :id, :title, :body, :address, 
    :start_datetime, :end_datetime, :capacity, :ticket_price, 
    :category, :created_at, :updated_at
  end

  