# frozen_string_literal: true

json.event do
    json.photoUrl @event.photo.url
    json.extract! @event, :id, :title, :body, :address, 
    :start_datetime, :end_datetime, :capacity, :ticket_price, 
    :category, :created_at, :updated_at
    json.organizer_first_name @event.organizer.first_name
    json.organizer_last_name @event.organizer.last_name
    json.organizer_id @event.organizer.id
    
  end

  