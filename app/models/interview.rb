class Interview < ApplicationRecord
  validates :round, :participant1, :participant2, :starts_at, :ends_at, presence: true
  validate :participants_should_be_different
  validate :date_cannot_be_in_the_past

  private
    def participants_should_be_different
      errors.add(:participant2, 'Participants Should be Different') if participant1 == participant2
    end

    def date_cannot_be_in_the_past
      if starts_at.present? && starts_at < (DateTime.now + (1.0/24)*0.5)
        errors.add(:starts_at, "Start should be 30 min from now")
      end
      if ends_at <= starts_at
        errors.add(:ends_at, "must be after the start of interview") 
      end 
    end
end
