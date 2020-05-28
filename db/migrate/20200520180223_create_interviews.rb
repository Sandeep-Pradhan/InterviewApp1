class CreateInterviews < ActiveRecord::Migration[6.0]
  def change
    create_table :interviews do |t|
      t.string :round
      t.string :participant1
      t.string :participant2
      t.datetime :starts_at
      t.datetime :ends_at

      t.timestamps
    end
  end
end
