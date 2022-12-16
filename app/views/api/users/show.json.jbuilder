
json.user do 
  json.id @user.id
  json.email @user.email
  json.event_ids @user.events.ids
  # json.tickets @user.tickets

end