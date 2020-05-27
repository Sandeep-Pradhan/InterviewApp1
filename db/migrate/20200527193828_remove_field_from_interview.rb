class RemoveFieldFromInterview < ActiveRecord::Migration[6.0]
  def change
    remove_column :interviews, :participant1
    remove_column :interviews, :participant2
  end
end
