class Api::TicketsController < ApplicationController
    before_action :require_logged_in

    def index
        @current_user = current_user
        @tickets = Ticket.all

        if @tickets
            render :index
        else
            render json: {errors: ['no tickets found']}, status:404
        end
    end


    def show
        @ticket = Ticket.find_by(id: params[:id])

        if @ticket
            render :show
        else
            render json: {errors: ['ticket not found']}, status:404
        end
    end
    
    def create
        event_tickets_count = Ticket.where(events_id: params[:event_id]).length
        @event = Event.find_by(id: params[:event_id])
        @ticket = Ticket.new(events_id: params[:event_id])
        @ticket.attendee_id = @current_user.id
        
        if event_tickets_count == @event.capacity
            render json: { errors: ['Sorry, tickets have sold out for this event'] }, status: :unprocessable_entity
        
        elsif (event_tickets_count < @event.capacity) && @ticket.save
            # render json: { message: 'Successfully purchased ticket!' }
            render :show
        
        else 
            render json: { errors: @ticket.errors.full_messages }, status: :unprocessable_entity
        end

    end

    def destroy
        @ticket = Ticket.find_by(id: params[:id])

        if @ticket
            @ticket.destroy
            render json: { message: 'Successfully deleted ticket' }
        else 
            render json: {errors: ['Was not able to complete your request']}, status: :unprocessable_entity
        end

    end

    # private
  
    # def ticket_params
    #   params.require(:ticket).permit(:event_id, )
    # end

end
