class TrainersController < ApplicationController

  def index
    trainers = Trainer.all
    render json: trainers, only: [:id, :name], include: {pokemons: {only: [:id, :nickname, :species]}}
  end

end
