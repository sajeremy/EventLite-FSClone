# frozen_string_literal: true

json.user do
  json.extract! @user, :id, :email, :events :created_at, :updated_at
  @user.events.ids
end
