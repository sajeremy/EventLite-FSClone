# == Schema Information
#
# Table name: tickets
#
#  id          :bigint           not null, primary key
#  events_id   :bigint           not null
#  attendee_id :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Ticket < ApplicationRecord
    validates :events_id, :attendee_id, presence: true
    # validate_on_create :tickets_within_capacity

    belongs_to :attendee,
    primary_key: :id,
    foreign_key: :attendee_id,
    class_name: :User

    belongs_to :event,
    primary_key: :id,
    foreign_key: :events_id,
    class_name: :Event

    has_one :organizer,
    through: :event


end
