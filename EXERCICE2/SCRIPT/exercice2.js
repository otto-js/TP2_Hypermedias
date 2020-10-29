var champs = document.getElementsByClassName("champs");

//Vérification live remplissage des champs
document.addEventListener("keyup", function(e) {
    for (var i = 0; i < champs.length; i++)
        champs[i].addEventListener("keyup", function() {
            validerChamps(champs);
        });
});

//Soummission du formulaire si champs remplis, bouton commander
document.getElementById("commander").addEventListener("submit", function(e) {
    soumettreFormulaire(champs, e);
});

//Réinitialisation du formulaire bouton recommencer
document.getElementById("recommencer").addEventListener("click", function() {
    resetFormulaire(champs);
});

//Affichage message boîte écran cochée/décochée
document.getElementById("ecran").addEventListener("click", afficherMessageCheckBoxEcran);





function validerChamps(champs) {
    var messageErreur = document.getElementById("message");
    var message = "";
    var check = true;
    const lesMessages = ["Veuillez entrer un nom", 
                        "<br>Veuillez entrer un code postal", 
                        "<br>Veuillez entrer un courriel", 
                        "<br>Veuillez confirmer le courriel"];

    for (var i = 0; i<champs.length; i++)
    if(!champs[i].value){
        message += lesMessages[i];
    }
    message += comparerCourriels(champs[2], champs[3]);  
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

function soumettreFormulaire(champs, e){
    var check = validerChamps(champs);

    if(!check){
        e.preventDefault();
        return false;
    } else {
        e.preventDefault(); 
        resetFormulaire(champs)
        creerEtAfficherFacture(champs);
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

function resetFormulaire(champs) {
    for (var i = 0; i < champs.length; i++)
    champs[i] = "";
}


function creerEtAfficherFacture(champs) {
    var produitSelectionne = document.getElementById("selection").selectedIndex;
    var prixProduit = parseInt(document.getElementsByTagName("option")[produitSelectionne].value);
    var boiteOption = document.getElementsByClassName("boiteOption");
    var messageFacture = document.getElementById("messageFacture");
    var facture = document.getElementById("facture");
    const options = [ "Écran", "Garantie", "Imprimante", "Souris"];

    messageFacture.innerHTML = "Voici votre facture";
    facture.style.display = "block";

    var nouveauTableau = document.createElement("table");
    var nouveauTitreTableau = document.createElement("caption");
    nouveauTitreTableau.innerHTML = "FACTURE";

    //création message entête tableau
    var enteteTableau = document.createElement("tr");
    var messageEntete = document.createElement("td");
    messageEntete.colSpan = "3";
    messageEntete.innerHTML = "Merci defaire avec nous " + champs[0].value +
                            "<br>Votre facture sera envoyée à " + champs[1].value + 
                            "<br>et un courriel de confirmation à " + champs[2].value;
    enteteTableau.appendChild(messageEntete);
    nouveauTableau.appendChild(enteteTableau);

    //création ligne Produit
    nouveauTableau.appendChild(creerLigne("Produit", "Dell", prixProduit))

    //création intitulé option
    var ligneOption = document.createElement("tr");
    var intituleLigneOption = document.createElement("td");
    intituleLigneOption.colSpan = "3";
    intituleLigneOption.innerHTML = "OPTIONS";
    ligneOption.appendChild(intituleLigneOption);
    nouveauTableau.appendChild(ligneOption);

    var prixTotalOptions = 0;
    //création champs options sélectionnées
    for(var i = 0; i < boiteOption.length; i++) {
        if (boiteOption[i].checked){
            nouveauTableau.appendChild(creerLigne(i+1, options[i], boiteOption[i].value));
            prixTotalOptions += parseInt(boiteOption[i].value);
        }
    }



    //création ligne Total
    nouveauTableau.appendChild(creerLigne("Total", prixTotalOptions+prixProduit, ""));
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





