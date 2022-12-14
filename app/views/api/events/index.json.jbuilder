# json.organizer_events do 
#     json.array! @current_user.events, :id
# end

json.events do 
    @events.each do |event|
        json.set! event.id do
            json.extract! event, :id, :title, :body, :address, 
            :start_datetime, :end_datetime, :capacity, :ticket_price, 
            :category, :created_at, :updated_at
            json.photoUrl event.photo.url
            json.organizer_first_name event.organizer.first_name
            json.organizer_last_name event.organizer.last_name
            json.organizer_id event.organizer.id
        end
        
    end

end