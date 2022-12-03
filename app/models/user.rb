class User < ApplicationRecord
    has_secure_password
    before_validation :ensure_session_token

    validates :email, 
        uniqueness: true,
        length: {in: 3..255}, 
        format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :password, length: {in: 6..255, allow_nil: true}
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