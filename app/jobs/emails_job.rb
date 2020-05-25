class EmailsJob < ApplicationJob
  queue_as :default

  def perform(*args)
    ReminderMailer.remind_mail(interview).deliver_now
  end
end
