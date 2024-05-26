const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const modoEscuro = document.getElementById("modo") 
const modoClaro = document.getElementById("modoC")
const Content = document.getElementById("content")
const body = document.getElementById("body")

modoEscuro.addEventListener('click', ()=> {
    Content.classList.add("fundo-content")
    body.classList.add("body-fundo")
    modoClaro.classList.add("display-block")
    modoEscuro.classList.add("display-none")
})
modoClaro.addEventListener('click', ()=> {
    Content.classList.remove("fundo-content")
    body.classList.remove("body-fundo")
    modoClaro.classList.remove("display-block")
    modoEscuro.classList.remove("display-none")
})

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})