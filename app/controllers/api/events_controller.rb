class Api::EventsController < ApplicationController
    # wrap_parameters include: Event.attribute_names
    
    def new

    end

    def show
        @event = Event.find_by(id: params[:id])
        if @event 
            render :show
        else
            render json: ['event not found'], status:404
        end
    end
    
    def create
        @event = Event.new(event_params)
        if @Event.save
        render :show
        else
        render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update

    end

    def destroy

    end

  
    private
  
    def event_params
      params.require(:event).permit(:title,:body, :address,
         :start_datetime, :end_datetime, :capacity,
        :ticket_price, :category)
    end
  end
  