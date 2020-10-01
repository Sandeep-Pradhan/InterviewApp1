class ReminderMailer < ApplicationMailer
  default from: "sandeeptest31313@gmail.com"

  def remind_mail(id)
    @interview = Interview.find(id)
    @emails = Participant.select("email").where("id in (?)", @interview.participant_ids)
    email_list = []
    for e in @emails do 
      email_list.append(e.email)
    end

    mail to: email_list, subject: "Reminder: interview is in 30 minutes", from: "sandeeptest31313@gmail.com"
  end

  def remind_update(id)
    @interview = Interview.find(id)
    @emails = Participant.select("email").where("id in (?)", @interview.participant_ids)
    email_list = []
    for e in @emails do 
      email_list.append(e.email)
    end

    mail to: email_list, subject: "Interview Time Updated", from: "sandeeptest31313@gmail.com"
  end

  def remind_delete(id)
    @interview = Interview.find(id)
    @emails = Participant.select("email").where("id in (?)", @interview.participant_ids)
    email_list = []
    for e in @emails do 
      email_list.append(e.email)
    end

    mail to: email_list, subject: "Interview Cancelled", from: "sandeeptest31313@gmail.com"
  end
end
