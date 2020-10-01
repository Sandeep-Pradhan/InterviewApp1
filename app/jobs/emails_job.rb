class EmailsJob < ApplicationJob
  queue_as :default

  def perform(interview_id, starts_at)
    @interview = Interview.find(interview_id)
    if @interview.id?
      if @interview.starts_at.to_i == starts_at.to_i  
        Interview.send_reminder(interview_id)
      else
        puts "Emails with different Starts time which is updated will not be sent."
      end
    else  
      puts "Interview deleted so will not send remainders"
    end
  end
end
