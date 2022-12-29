# json.tickets do 
#     @tickets.each do |ticket|
#         json.set! ticket.id do
#             json.extract! ticket, :events_id, :attendee_id
#         end        
#     end
# end

json.tickets do 
    @user_tickets.each do |ticket|
        json.set! ticket.id do
            json.extract! ticket, :id, :events_id, :attendee_id
        end        
    end
end