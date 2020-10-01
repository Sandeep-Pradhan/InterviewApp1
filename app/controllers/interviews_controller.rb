class InterviewsController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :set_interview, only: [:show, :edit, :update, :destroy]

  def index
    @interviews = Interview.all.order("starts_at ASC")    
    render json: @interviews #For Spa Api data
  end

  def show
    render json: @interview
  end

  def new
    @interview = Interview.new
  end
  
  def edit
  end
  
  def create
    @interview = Interview.new(interview_params)

    respond_to do |format|
      if @interview.save
        format.html { redirect_to @interview, notice: 'Interview was successfully created.' }
        format.json { render :show, status: :created, location: @interview }
      else
        format.html { render :new }
        format.json { render json: @interview.errors, status: :unprocessable_entity }
      end
    end
  end
  
  def update
    respond_to do |format|
      if @interview.update(interview_params)
        format.html { redirect_to @interview, notice: 'Interview was successfully updated.' }
        format.json { render :show, status: :ok, location: @interview }
      else
        format.html { render :edit }
        format.json { render json: @interview.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @interview.destroy
    respond_to do |format|
      format.html { redirect_to interviews_url, notice: 'Interview was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_interview
      @interview = Interview.find(params[:id])
    end

    def interview_params
      params.require(:interview).permit(:round, :starts_at, :ends_at, participant_ids: [])
    end
end
