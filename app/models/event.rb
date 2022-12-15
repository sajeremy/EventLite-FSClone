# == Schema Information
#
# Table name: events
#
#  id             :bigint           not null, primary key
#  title          :string           not null
#  body           :text             not null
#  address        :string           not null
#  lat_location   :float
#  lng_location   :float
#  start_datetime :datetime         not null
#  end_datetime   :datetime         not null
#  capacity       :integer          not null
#  ticket_price   :decimal(5, 2)    not null
#  category       :string           not null
#  organizer_id   :bigint           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class Event < ApplicationRecord
    validates :start_datetime, 
        comparison: { greater_than: DateTime.now(), less_than: :end_datetime }
    validates :capacity, 
        numericality: {greater_than: 0}
    validates :title, 
        length: {in: 3..255, message: "must be between 3 and 255 characters"}
    validates :ticket_price, 
        numericality: { greater_than_or_equal_to: 0, less_than: BigDecimal(10**3) },
        format: { with: /\A\d{1,3}(\.\d{1,2})?\z/ }
    validates :title, :body, :address, :end_datetime, :capacity, :ticket_price, :category,  presence: true

    belongs_to :organizer,
    primary_key: :id,
    foreign_key: :organizer_id,
    class_name: :User

    has_one_attached :photo 
    #has_many_attached :photos

    has_many :tickets,
    primary_key: :id,
    foreign_key: :events_id
    class_name: :Event,
    dependent: :destroy
end
