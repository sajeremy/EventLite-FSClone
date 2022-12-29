json.likes do 
    @event_likes.each do |like|
        json.set! like.id do
            json.extract! like, :id, :event_id, :user_id
        end        
    end
end