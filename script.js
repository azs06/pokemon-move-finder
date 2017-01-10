const pokeInput = document.getElementById('pokemonType');
const pokeButton = document.getElementById('pokeButton');
const pokeBlock = document.querySelector('.pokeBlock');
const validPokemonTypes = ['poison','water','bug','ghost','fairy','fighting','electric','dragon','grass','ice','ground','flying','psychic','dark','fire','steel','rock'];

let moves = [];

pokeButton.addEventListener('click', ()=> {
	if(validPokemonTypes.indexOf(pokeInput.value) >= 0){
		pokeBlock.innerHTML = "<p>" + pokeInput.value + "</p>";
		getPokemonMoves(pokeInput.value);
	}else{
		pokeBlock.innerHTML = "<p>Invalid Pokemon type</p>";
	}
	
	
});

function getPokemonMoves(type){
		console.log(`fetching ${type} type pokemon moves`);
		fetch(`//pokeapi.co/api/v2/type/${type}`,{mode: 'cors'})  
		  .then(status)  
		  .then(json)  
		  .then(function(data) {  
			console.log('Request succeeded with JSON response', data);
			moves = data.moves;
			moves = moves.map(function(move){
					return `<li>${move.name}</li>`
			});
			moves.forEach(function(move){
				pokeBlock.insertAdjacentHTML('afterend', move);
			});
		  }).catch(function(error) {  
			console.log('Request failed', error);  
		  });
}

function status(response) {  
  if (response.status >= 200 && response.status < 300) {  
    return Promise.resolve(response)  
  } else {  
    return Promise.reject(new Error(response.statusText))  
  }  
}

function json(response) {  
  return response.json()  
}


