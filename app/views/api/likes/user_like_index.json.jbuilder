# json.likes do 
#     @user_likes.each do |like|
#         json.set! like.id do
#             json.extract! like, :id, :event_id, :user_id
#         end        
#     end
# end

# json.likes do 
#     @user_likes.each do |like|
#         json.set! like.event_id do
#             json.extract! like, :id
#         end        
#     end
# end

json.likes @user_like_arr