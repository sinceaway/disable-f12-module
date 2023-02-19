//Active/Désactive l'accès à d'autres pages
var ultrastrict = false;
//Insérer l'URL vers laquelle les fonctions vont redirigées lorsqu'elles vont détecter l'inspecteur
var urlerror = "http://www.google.com";


//S'éxécute lorsque la page se charge
window.addEventListener('load', function() {
    //Text dans console, peu utile
    console.log('La page est chargée !');
    console.log("La taille de la largeur de la page de l'utilisateur est de " + save1_taille_widht + " et sa hauteur est de " + save1_taille_height);

    //Check si l'utilisateur est déjà venu sur le site
    //Si non, il enregistre sa résolution d'écran dans les cookies
    if (document.cookie.indexOf('visited=true') === -1) {
        var expiration = new Date();
        expiration.setTime(expiration.getTime() + (365 * 24 * 60 * 60 * 1000)); // Expire dans 1 an
        document.cookie = 'visited=true; expires=' + expiration.toUTCString() + '; path=/';
    
        console.log('Première visite !');
        var expiration = new Date();
        expiration.setTime(expiration.getTime() + (30 * 24 * 60 * 60 * 1000));

        document.cookie = "save1cookie=" + encodeURIComponent(window.innerHeight) + "; " + "expires=" + expiration.toUTCString() + "; path=/";
        document.cookie = "save2widthcookie=" + encodeURIComponent(window.innerWidth) + "; " + "expires=" + expiration.toUTCString() + "; path=/";

  } else {
    console.log('Déjà venu');
  }
    
  
  });

  //fonction qui get l'info contenu dans le cookie nommé par l'utilisateur lorsqu'il fait appel à la fonction
  function getCookieValue(cookieName){
    var regex = new RegExp('(?:(?:^|.*;\\s*)' + cookieName + '\\s*\\=\\s*([^;]*).*$)|^.*$');
    var cookieValue = document.cookie.replace(regex, "$1");
    
    cookieValue = decodeURIComponent(cookieValue);
    
    return cookieValue;
  }

  //stocker la résolution de l'utilisateur lors de sa première connexion
  var save1_taille_height = getCookieValue('save1cookie');
  var save1_taille_widht = getCookieValue('save2widthcookie');



//Bloque le F12 et toutes ses variantes
document.onkeydown = function(e) {
	if (event.keyCode == 123) {
		return false;
	}
	if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
		return false;
	}
	if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
		return false;
	}
	if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
		return false;
	}
	if (e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)) {
		return false;
	}
	if (e.ctrlKey && e.keyCode == 'H'.charCodeAt(0)) {
		return false;
	}
	if (e.ctrlKey && e.keyCode == 'A'.charCodeAt(0)) {
		return false;
	}
	if (e.ctrlKey && e.keyCode == 'E'.charCodeAt(0)) {
		return false;
	}
}



//Désactive le clique droit
// document.addEventListener('contextmenu', function(e) {
// 	e.preventDefault();
// });


//Check si la souris est en dehors de la page
function checkMousePosition(){
    window.onmouseout = function(event) {
        var x = event.clientX;
        var y = event.clientY;    
        
        if (y < 0 || x < 0 || (x > window.innerWidth || y > window.innerHeight)) {
                
            if (y >= 0 && y <= 45 && x >= 0 && x <= window.innerWidth) {
                window.location.href = urlerror; 
            } else {
                window.location.href = urlerror;
            }
        }
    };
} 


//Initialisation des variables actuelles de la résolution de l'utilisateur
var save2_height;
var save2_widht;

//Fonction qui check si l'inspecteur est ouvert
function checkInspectorpart2(){
    var save2_height = window.innerHeight;
    var save2_widht = window.innerWidth;

    console.log("La page actuelle de l'utilisateur fait ", save2_height, " x ", save2_widht, " pixels. Et sa fenêtre de base fait ", save1_taille_height, " x ", save1_taille_widht, " pixels");
    if(save1_taille_height != save2_height){
        console.log("L'inspecteur est allumé");
        window.location.href = urlerror;
    } else{
        if(save1_taille_widht != save2_widht){
            window.location.href = urlerror;
        } else {
            console.log("Rien à signaler par ici ! L'inspecteur est éteint")
        }
    }
}

window.addEventListener('blur', function() {
    if(ultrastrict == false){
        
    } else {
        window.location.href = urlerror;
    }

  });

//Permet de vérifier toutes les 500 millisecondes si l'inspecteur est allumé
setInterval(checkInspectorpart2, 500);

//Permet de vérifier toutes les 500 millisecondes si la souris est en dehors de la page
//setInterval(checkMousePosition, 500);