class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  respond_to :json
  before_filter :check_format

  def check_format
    render :nothing => true, :status => 406 unless params[:format] == 'json' || request.headers["Accept"] =~ /json/
  end
end
