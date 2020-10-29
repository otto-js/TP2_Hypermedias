var nom = document.getElementById("nom");
var codePostal = document.getElementById("codePostal");
var courriel1 = document.getElementById("email1");
var courriel2 = document.getElementById("email2");

var champs = document.getElementsByClassName("champs");

//Vérification qdu remplissage des champs
document.addEventListener("keyup", function(e) {
    for (var i = 0; i < champs.length; i++)
        champs[i].addEventListener("keyup", function() {
            validerChamps(nom, codePostal, courriel1, courriel2);
        });
});

//Soummission le formulaire si tous les champs sont remplis
document.getElementById("commander").addEventListener("submit", function(e) {
    soumettreFormulaire(nom, codePostal, courriel1, courriel2, e);
});

//Réinitialisation du formulaire
document.getElementById("recommencer").addEventListener("click", function() {
    resetFormulaire(nom, codePostal, courriel1, courriel2);
});

//Affichage message boîte écran cochée/décochée
document.getElementById("ecran").addEventListener("click", afficherMessageCheckBoxEcran);





function validerChamps(nom, codePostal, courriel1, courriel2) {
    var messageErreur = document.getElementById("message");
    var message = "";
    var check = true;

    if(!nom.value){
        message += "Veuillez entrer un nom";
    }
    if(!codePostal.value) {
        message+= "<br>Veuillez entrer un code postal";
    }
    if(!courriel1.value) {
        message += "<br>Veuillez entre un courriel";
    }
    if(!courriel2.value) {
        message += "<br>Veuillez confirmer le courriel";
    }

    message += comparerCourriels(courriel1, courriel2);  
    messageErreur.innerHTML = message;
    if(message){
        check = false;
    } 
    return check;
}

function comparerCourriels(courriel1, courriel2) {
    var message = "";
    if(courriel1.value && courriel2.value)
        if(courriel1.value !== courriel2.value)
            message = "<br>Les courriels doivent être identiques";
    return message;
}

function soumettreFormulaire(nom, codePostal, courriel1, courriel2, e){
    var check = validerChamps(nom, codePostal, courriel1, courriel2);

    if(!check){
        e.preventDefault();
        return false;
    } else {
        e.preventDefault(); 
        resetFormulaire(nom, codePostal, courriel1, courriel2)
        creerEtAfficherFacture(nom, codePostal, courriel1);
        alert("Votre commande est passée");

    }

}

function afficherMessageCheckBoxEcran() {
    if (this.checked){
        alert("Bravo! Vous êtes le roi des bonnes décisions!");
    }
    else {
        alert("Attention! Si cette case reste décochée, un bébé panda meurt");
    }
}

function resetFormulaire(nom, codePostal, courriel1, courriel2) {
    nom.value = "";
    codePostal.value  = "";
    courriel1.value  = "";
    courriel2.value  = "";
}


function creerEtAfficherFacture(nom, codePostal, courriel1) {
    var produitSelectionne = document.getElementById("selection").selectedIndex;
    var prixProduit = document.getElementsByTagName("option")[produitSelectionne].value;
    var boiteOption = document.getElementsByClassName("boiteOption");
    var messageFacture = document.getElementById("messageFacture");
    var facture = document.getElementById("facture");
    var options = [ "Écran", "Garantie", "Imprimante", "Souris"];

    messageFacture.innerHTML = "Voici votre facture";
    facture.style.display = "block";

    var nouveauTableau = document.createElement("table");
    var nouveauTitreTableau = document.createElement("caption");
    nouveauTitreTableau.innerHTML = "FACTURE";

    nouveauTableau.appendChild(creerLigne("Produit", "Dell", prixProduit))

    for(var i = 0; i < boiteOption.length; i++) {
        if (boiteOption[i].checked){
            nouveauTableau.appendChild(creerLigne(i+1, options[i], boiteOption[i].value));
        }
    }
    nouveauTableau.appendChild(nouveauTitreTableau);
    facture.appendChild(nouveauTableau);
}


function creerLigne(option, produit, prix) {
    var options = [option, produit, prix];
    var ligneSupplementaire = document.createElement("tr");
    var colonneSupplementaire;
    for (var i = 0; i < 3; i++){
        colonneSupplementaire = document.createElement("td");
        colonneSupplementaire.innerHTML = options[i];
        ligneSupplementaire.appendChild(colonneSupplementaire);
    }
    return ligneSupplementaire;
}



