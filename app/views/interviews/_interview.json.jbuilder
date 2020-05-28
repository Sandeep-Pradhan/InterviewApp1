json.extract! interview, :id, :round, :starts_at, :ends_at, :created_at, :updated_at, participant_ids: []
json.url interview_url(interview, format: :json)
