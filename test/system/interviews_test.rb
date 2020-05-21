require "application_system_test_case"

class InterviewsTest < ApplicationSystemTestCase
  setup do
    @interview = interviews(:one)
  end

  test "visiting the index" do
    visit interviews_url
    assert_selector "h1", text: "Interviews"
  end

  test "creating a Interview" do
    visit interviews_url
    click_on "New Interview"

    fill_in "Ends at", with: @interview.ends_at
    fill_in "Participant1", with: @interview.participant1
    fill_in "Participant2", with: @interview.participant2
    fill_in "Round", with: @interview.round
    fill_in "Starts at", with: @interview.starts_at
    click_on "Create Interview"

    assert_text "Interview was successfully created"
    click_on "Back"
  end

  test "updating a Interview" do
    visit interviews_url
    click_on "Edit", match: :first

    fill_in "Ends at", with: @interview.ends_at
    fill_in "Participant1", with: @interview.participant1
    fill_in "Participant2", with: @interview.participant2
    fill_in "Round", with: @interview.round
    fill_in "Starts at", with: @interview.starts_at
    click_on "Update Interview"

    assert_text "Interview was successfully updated"
    click_on "Back"
  end

  test "destroying a Interview" do
    visit interviews_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Interview was successfully destroyed"
  end
end
