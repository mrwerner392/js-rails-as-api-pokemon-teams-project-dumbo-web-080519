class PokemonsController < ApplicationController

  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name

    pokemon = Pokemon.new(nickname: name, species: species, trainer_id: params[:trainer_id])

    if pokemon.save
      render json: pokemon, only: [:id, :nickname, :species]
    else
      render json: {error: "that did not work"}
    end
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.destroy()
  end

end
