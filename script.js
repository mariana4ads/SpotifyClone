const searchInput = document.getElementById('search-input');
const resultArtists = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlist');

window.onload = function() {
    var greeting;
    var hora = new Date().getHours();

    if (hora >= 6 && hora < 12) {
        greeting = "Bom dia!";
    } else if (hora >= 12 && hora < 18) {
        greeting = "Boa tarde!";
    } else {
        greeting = "Boa noite!";
    }

    document.getElementById("greeting").innerText = greeting;
}


function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists`;
    fetch(url)
        .then((response) => response.json())
        .then(result =>
            displayResults(result.filter(
                (item => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ? true : false )
            ))
        );
}

 
function displayResults(results) {
    resultPlaylist.classList.add('hidden')
    resultArtists.classList.remove('hidden');

    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    if (results.length === 0) {
        resultArtists.classList.add('hidden');
        return;
    }

    results.forEach(element => {
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
  
    })

}

document.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtists.classList.add('hidden');
        return;

    } 

    

    requestApi(searchTerm);
});
