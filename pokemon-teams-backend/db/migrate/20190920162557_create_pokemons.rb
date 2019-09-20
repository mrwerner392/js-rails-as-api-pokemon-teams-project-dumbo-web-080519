class CreatePokemons < ActiveRecord::Migration[6.0]
  def change
    create_table :pokemons do |t|
      t.string :species
      t.string :nickname
      t.belongs_to :trainer, null: false, foreign_key: true

      t.timestamps
    end
  end
end
