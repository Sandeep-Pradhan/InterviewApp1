class Interview < ApplicationRecord
  has_many :interview_participants, dependent: :delete_all  
  has_many :participants, :through => :interview_participants
  
  validates :round, :starts_at, :ends_at, presence: true
  validate :date_cannot_be_in_the_past
  validate :no_overlap

  has_attached_file :resume
  validates_attachment_presence :resume
  validates_attachment :resume, presence: true, content_type: { content_type: "application/pdf" }

  after_create :remind
  after_update :remind_update_mail
  after_destroy :remind_delete_mail

  private
    def remind
      ReminderMailer.remind_mail(self).deliver_later(wait_until: (self.starts_at - DateTime.now - 30.minutes).seconds.from_now)
    end
    def remind_update_mail
      ReminderMailer.remind_update(self).deliver_now
      ReminderMailer.remind_mail(self).deliver_later(wait_until: (self.starts_at - DateTime.now - 30.minutes).seconds.from_now)
    end
    def remind_delete_mail
      ReminderMailer.remind_delete(self).deliver_now
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
    overlaps = Interview.joins("INNER JOIN interview_participants pi ON interviews.id = pi.interview_id")
    .where("pi.participant_id in (:idd) AND ((interviews.starts_at <= :s AND interviews.ends_at >= :s) OR (interviews.starts_at <= :e AND interviews.ends_at >= :e) OR (interviews.starts_at >= :s AND interviews.ends_at <= :e))", idd:self.participant_ids, s:self.starts_at,e:self.ends_at)

    if overlaps.where.not(updated_at: self.updated_at).any?
      errors.add(:participant_ids, 'Interview Overlaps for some participants')
    end
end
