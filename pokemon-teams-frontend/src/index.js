const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")


fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(trainersObj => {
    trainersObj.forEach(makeTrainerCard)
  });

function makeTrainerCard(trainer) {

  let trainerDiv = document.createElement("div");
  trainerDiv.classList.add("card");
  trainerDiv.dataset.id = trainer.id;

  let trainerAddPokemonButton = document.createElement("button");
  trainerAddPokemonButton.dataset.trainerId = trainer.id;
  trainerAddPokemonButton.innerText = "Add Pokemon";
  trainerAddPokemonButton.addEventListener("click", function(e) {
    fetch(POKEMONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "trainer_id": `${trainer.id}`
      })
    }).then(res => res.json())
      .then(newPoke => {
        let newPokeLi = makePokemonLi(newPoke);
        trainerPokemonUl.append(newPokeLi)
      });
  });

  let trainerPokemonUl = document.createElement("ul")

  trainer.pokemons.forEach(pokemon => {
    let pokemonLi = makePokemonLi(pokemon);
    trainerPokemonUl.append(pokemonLi)
  });

  trainerDiv.append(trainerAddPokemonButton, trainerPokemonUl);

  main.append(trainerDiv);

}

function makePokemonLi(pokemon) {

  let newPokemonLi = document.createElement("li");
  newPokemonLi.innerText = `${pokemon.nickname} (${pokemon.species}) `;

  let removePokemonButton = document.createElement("button");
  removePokemonButton.classList.add("release");
  removePokemonButton.dataset.pokemonId = pokemon.id;
  removePokemonButton.innerText = "Release";
  removePokemonButton.addEventListener("click", function(e) {
    fetch(`${POKEMONS_URL}/${pokemon.id}`, {
      method: "DELETE"
    })
    newPokemonLi.remove();
  })


  newPokemonLi.append(removePokemonButton);

  return newPokemonLi;
}
