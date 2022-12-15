# frozen_string_literal: true

json.ticket do
    json.extract! @ticket, :events_id, :attendee_id 
  end

  