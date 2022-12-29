# == Schema Information
#
# Table name: likes
#
#  id         :bigint           not null, primary key
#  event_id   :bigint           not null
#  user_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Like < ApplicationRecord
    validates :event_id, :user_id, presence: true

    belongs_to :event,
    primary_key: :id,
    foreign_key: :event_id,
    class_name: :Event

    belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User
end
