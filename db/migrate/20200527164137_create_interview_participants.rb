class CreateInterviewParticipants < ActiveRecord::Migration[6.0]
  def change
    create_table :interview_participants do |t|
      t.references :interview, null: false, foreign_key: true
      t.references :participant, null: false, foreign_key: true

      t.timestamps
    end
  end
end
