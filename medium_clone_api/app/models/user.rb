class User < ActiveRecord::Base
  has_many :posts

  before_create :set_auth_token

  def set_auth_token
    self.auth_token = generate_random_token
  end

  private
  def generate_random_token
    loop do
      random_token = SecureRandom.hex
      break random_token unless self.class.exists?(auth_token: random_token)
    end
  end
end
