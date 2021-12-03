const form = document.querySelector('#form')
const searchInput = document.querySelector('#search')
const songsContainer = document.querySelector('#songs-container')
const prevAndNextContainer = document.querySelector('#prev-and-next-container')

const apiURL = `https://api.lyrics.ovh` 

const insertSongsIntoPage = songsInfo => {
  songsContainer.innerHTML = songsInfo.data.map(song => `
  <li class="song">
    <span class="song-artist"><strong>${song.artist.name}</strong> - ${song.title}<span>
    <button class="btn" data-artist="${song.artist.name}" data-song-title="${song.title}">Ver letra</button>
  </li>` )
  .join('')
}

const fetchSongs = async term => {
  const response = await fetch(`${apiURL}/suggest/${term}`)
  const data = await response.json()

  insertSongsIntoPage(data)
}

form.addEventListener('submit', event => {
  event.preventDefault()

  const searchTerm = searchInput.value.trim()
  /*usar o trim para remover os espaços em brancos antes e depois da string a que o usuario pode digitar */

  if(!searchTerm) {
    songsContainer.innerHTML = `<li class="warning-message">Por favor, digite um termo válido</li>`
    return
  } //pra não usar o else dentro de uma função, sendo que o else iria impedir da fetchSongs ser executada pra uma string vazia, é só usar o return que ela para a exeucação da função

  fetchSongs(searchTerm)

  console.log(searchTerm)
})