json.events do 
    @events.each do |event|
        json.set! event.id do
            json.extract! event, :id, :title, :body, :address, 
            :start_datetime, :end_datetime, :capacity, :ticket_price, 
            :category, :created_at, :updated_at
            json.photoUrl event.photo.url
        end
    end
end
