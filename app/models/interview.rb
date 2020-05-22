class Interview < ApplicationRecord
  validates :round, :participant1, :participant2, :starts_at, :ends_at, presence: true
  validate :participants_should_be_different
  validate :date_cannot_be_in_the_past
  validate :no_overlap

  has_attached_file :resume
  validates_attachment_presence :resume
  validates_attachment :resume, presence: true, content_type: { content_type: "application/pdf" }

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

  def no_overlap
    if (Interview.where("((:s1 BETWEEN starts_at AND ends_at) OR (:e1 BETWEEN starts_at AND ends_at) OR (:s1< starts_at AND :e1>ends_at)) AND (participant1 = :p1 OR participant2 = :p1)", s1:self.starts_at, e1:self.ends_at,p1: self.participant1).where.not(updated_at: self.updated_at).any?)
      errors.add(:participant1, 'It overlaps another interview')
    end
    if (Interview.where("((:s2 BETWEEN starts_at AND ends_at) OR (:e2 BETWEEN starts_at AND ends_at) OR (:s2< starts_at AND :e2>ends_at)) AND (participant1 = :p2 OR participant2 = :p2)", s2:self.starts_at, e2:self.ends_at,p2: self.participant2).where.not(updated_at: self.updated_at).any?)
      errors.add(:participant2, 'It overlaps another interview')
    end
  end
end
