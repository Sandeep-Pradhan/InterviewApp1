class ReminderMailer < ApplicationMailer
  default from: "sandeeptest3131@gmail.com.com"
  def remind_update(interview)
    @interview = interview
    mail to: @interview.participant1, subject: "Interview Time Updated"
    mail to: @interview.participant2, subject: "Interview Time Updated"
  end

  def remind_mail(interview)
    @interview = interview
    mail to: @interview.participant1, subject: "Reminder: interview is in 30 minutes"
    mail to: @interview.participant2, subject: "Reminder: interview is in 30 minutes"
  end

  def remind_delete(interview)
    @interview = interview
    mail to: @interview.participant1, subject: "Interview Cancelled"
    mail to: @interview.participant2, subject: "Interview Cancelled"
  end
end
