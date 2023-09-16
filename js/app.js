//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


//Event listeners
eventListeners();

function eventListeners() {
  //cuando el usario agrega un nuevo tweet
  formulario.addEventListener('submit', agregarTweet);
  
  //Cuando el documento esta listo
  document.addEventListener('DOMContentLoaded', () => {
    tweets = JSON.parse(localStorage.getItem('tweets')) || [];

    crearHTML();
  })

}


//Funciones
function agregarTweet(e) {
  e.preventDefault();

  //Textarea donde el usario escribe
  const tweet = document.querySelector('#tweet').value;

  //Validación
  if(tweet === '') {
    mostrarError('No puede ir vacio');

    return; //corta la ejecucion del codigo
  }

  const tweetObj = {
    id: Date.now(),
    tweet
  }

  //Agregar al array de tweets
  tweets = [...tweets, tweetObj];

  //creamos el HTML
  crearHTML();

  //Reiniciar el formulario
  formulario.reset();
}

//Mostrar mensaje de error
function mostrarError(error) {
  const mensajeError = document.createElement('P');
  mensajeError.textContent = error;
  mensajeError.classList.add('error');

  //Insertar en el contenido
  const contenido = document.querySelector('#contenido');
  contenido.appendChild(mensajeError);

  //Elimina la alerta despues de un tiempo
  setTimeout(() => {
    mensajeError.remove();
  }, 2500);
}


//Muestra un listado de los tweets
function crearHTML() {

  limpiarHTML();

  if(tweets.length > 0) {
    tweets.forEach(tweet => {
      //Agregar un boton de eliminar
      const btnEliminar = document.createElement('a');
      btnEliminar.classList.add('borrar-tweet');
      btnEliminar.innerText = 'X';

      //Añadir la funcion de eliminar
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      }
      
      //Crear el HTML
      const li = document.createElement('li');

      //añadir el texto
      li.innerText = tweet.tweet;

      //Asignar el boton
      li.appendChild(btnEliminar);

      //insertar en el html
      listaTweets.appendChild(li);
    })
  }

  sincronizarStorage();
}

//Agrega los tweets actuales a localStorage
function sincronizarStorage() {
  localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Elimina un tweet
function borrarTweet(id) {
  tweets = tweets.filter(tweet => tweet.id !== id);

  crearHTML();
}

//Limpiar el HTML
function limpiarHTML() {
  while(listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}