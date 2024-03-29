// search elements:
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

//display elements:
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const pokemonTypes = document.getElementById("types");

const spriteContainer = document.querySelector(".sprite-container");

// stats elements:

const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

// valid pokemons array:

let validPokemonsArr = [];
let currentPokemon = [];

const fetchPokemonIdData = () => {
  resetDisplay();
  // fetching the data of valid pokemons:
  fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon")
    .then((response) => response.json())
    .then((data) => {
      validPokemonsArr = data.results;
      checkValidPokemon(validPokemonsArr); // it comes in then because we can only do this if we fetched all data.
    })
    .catch((error) => {
      console.error("Error in fetching:", error);
      alert("There was an error getting the pokemon ID data");
    });
};

const checkValidPokemon = (validPokemonsArr) => {
  const input = searchInput.value.toLowerCase();

  //check if it matches any pokemon name or ID

  const matchFound = validPokemonsArr.find((res) => {
    return res.name.toLowerCase() === input || res.id.toString() === input;
  });

  if (matchFound) {
    getCurrentPokemon(matchFound.url);
  } else {
    alert("Pokémon not found");
  }
};

const getCurrentPokemon = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      currentPokemon = data;
      showPokemon(currentPokemon); // it comes in then because we can only do this if we fetched all data.
    })
    .catch((error) => {
      console.error("Error in fetching current Pokemon:", error);
      alert("There was an error getting the CURRENT pokemon data");
    });
};

const showPokemon = (currentPokemon) => {
  // pokemon basic info:
  pokemonName.innerText = currentPokemon.name.toUpperCase();
  pokemonId.textContent = `#${currentPokemon.id}`;
  weight.textContent = `weight: ${currentPokemon.weight}`;
  height.textContent = `Height: ${currentPokemon.height}`;

  // sprite:
  spriteContainer.innerHTML = `<img id="sprite" src="${currentPokemon.sprites.front_default}" alt="${currentPokemon.name} image">`;

  // types:
  // pokemon have multiple types.

  pokemonTypes.innerHTML = "";

  currentPokemon.types.forEach((el) => {
    pokemonTypes.innerHTML += ` <div class="type ${el.type.name}">${el.type.name}</div>`;
  });

  // pokemon stats:
  hp.innerText = currentPokemon.stats[0].base_stat;
  attack.innerText = currentPokemon.stats[1].base_stat;
  defense.innerText = currentPokemon.stats[2].base_stat;
  specialAttack.innerText = currentPokemon.stats[3].base_stat;
  specialDefense.innerText = currentPokemon.stats[4].base_stat;
  speed.innerText = currentPokemon.stats[5].base_stat;
};

const resetDisplay = () => {
  pokemonName.innerText = "";
  pokemonId.textContent = "";
  weight.textContent = "";
  height.textContent = "";
  spriteContainer.innerHTML = "";
  pokemonTypes.innerHTML = "";
  hp.innerText = "";
  attack.innerText = "";
  defense.innerText = "";
  specialAttack.innerText = "";
  specialDefense.innerText = "";
  speed.innerText = "";
};

searchButton.addEventListener("click", fetchPokemonIdData);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    fetchPokemonIdData();
  }
});
