// CONECTAR E CAPTURAR AS INFORMAÇÕES DA POKE API
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonName = document.querySelector('.pokemon__name');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIReponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIReponse.status === 200) {

        const data = await APIReponse.json();
        
        return data;
        
    }
    
    
};

const renderPokemon = async (pokemon) => {
    
    pokemonName.innerHTML = "Loading...";
    pokemonNumber.innerHTML = "🕐";
    pokemonImage.src = "";

    const data = await fetchPokemon(pokemon);

    console.log(data);
    
    if (data){
        
        // Caso tudo de certo 
        pokemonImage.src = data.sprites.versions["generation-v"]["black-white"].animated.front_default;
        pokemonImage.style.width = "25%";
        pokemonNumber.innerHTML = data.id;
        pokemonName.innerHTML = data.name;
        input.value = "";
        searchPokemon = data.id;
        
    } else {
        
        // Caso de errado
        pokemonImage.src = "https://pa1.aminoapps.com/7173/0ad68529632324ca105036e2fecdf556b4ff0c7er1-660-700_00.gif"; 
        pokemonImage.style.width = "30%";
        pokemonNumber.innerHTML = "";
        pokemonName.innerHTML = "Not Found! :/";

    }

};

form.addEventListener('submit', (event) => {

    event.preventDefault();

    renderPokemon(input.value.toLowerCase());

});

buttonPrev.addEventListener('click', () => {

    if (searchPokemon > 1) {

        searchPokemon -= 1;

        renderPokemon(searchPokemon);
        
    }

});

buttonNext.addEventListener('click', () => {

    searchPokemon += 1;

    renderPokemon (searchPokemon);

});

renderPokemon(searchPokemon);