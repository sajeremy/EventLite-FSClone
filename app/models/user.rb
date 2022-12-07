# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  first_name      :string           not null
#  last_name       :string           not null
#  street_address  :string
#  city            :string
#  state           :string
#  country         :string
#  zipcode         :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    has_secure_password
    before_validation :ensure_session_token

    validates :email, 
        uniqueness: true,
        length: {in: 3..255}, 
        format: { with: URI::MailTo::EMAIL_REGEXP, message: "address must be valid" }
    validates :password, length: {in: 8..255, allow_nil: true}
    validates :first_name, length: {in: 1..255, message: "can't be blank"}
    validates :last_name,  length: {in: 1..255, message: "can't be blank"}
    validates :session_token, presence: true, uniqueness: true

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        return nil if user.nil?
        user.authenticate(password) ? user : nil
    end

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end

    def reset_session_token!
        self.session_token = generate_unique_session_token
        save!
        session_token
    end

    private

    def generate_unique_session_token
        while true
            token = SecureRandom.urlsafe_base64
            return token unless User.exists?(session_token: token)
        end
    end
end
