var champs = document.getElementsByClassName("champs");

//Vérification live remplissage des champs
    for (var i = 0; i < champs.length; i++) {
        champs[i].onkeyup = function() { validerChamps(champs);};
        console.log(document.getElementById("message").innerHTML);
    }
   
//changement couleur fond champs
for (let i = 0; i < champs.length; i++){
    champs[i].onfocus = function() {this.style.backgroundColor = "orange"; };
    champs[i].onblur = function() {this.style.backgroundColor = "white"; };
}

//Soummission du formulaire si champs remplis, bouton commander
document.getElementById("commander").addEventListener("submit", function(e) {
    soumettreFormulaire(champs, e);
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
    var bouton = document.getElementById("commander");
    var check = validerChamps(champs);

    if(!check){
        e.preventDefault();
        return false;
    } else {
        e.preventDefault(); 
        creerEtAfficherFacture(champs);
        resetFormulaire(champs)
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
    champs[i].value = "";
}

function creerEtAfficherFacture(champs) {
    var produitSelectionne = document.getElementById("selection").selectedIndex;
    var prixProduit = parseFloat(document.getElementsByTagName("option")[produitSelectionne].value);
    var labelProduit = document.getElementById("selection")[produitSelectionne].innerHTML.split(" ")[0];
    var boiteOption = document.getElementsByClassName("boiteOption");
    var messageFacture = document.getElementById("messageFacture");
    var facture = document.getElementById("facture");
    const options = [ "Écran", "Garantie", "Imprimante", "Souris"];

    

    messageFacture.innerHTML = "Voici votre facture";
    facture.style.display = "block";

    var nouveauTableau = document.createElement("table");
    var nouveauTitreTableau = document.createElement("caption");
    nouveauTitreTableau.innerHTML = "Facture ordinateur portable";

    //création message entête tableau
    var enteteTableau = document.createElement("tr");
    var messageEntete = document.createElement("td");
    messageEntete.colSpan = "3";
    messageEntete.innerHTML = "Merci de faire affaire avec nous " + champs[0].value +
                            "<br>Votre facture sera envoyée à " + champs[1].value + 
                            "<br>et un courriel de confirmation à " + champs[2].value;
    enteteTableau.appendChild(messageEntete);
    nouveauTableau.appendChild(enteteTableau);

    //création ligne Produit
    nouveauTableau.appendChild(creerLigne("PRODUIT", labelProduit, prixProduit))

    var prixTotalOptions = 0;
    //création intitulé option
    if (boiteOption[0].checked || 
        boiteOption[1].checked || 
        boiteOption[2].checked || 
        boiteOption[3].checked) {
    var ligneOption = document.createElement("tr");
    var intituleLigneOption = document.createElement("td");
    intituleLigneOption.colSpan = "3";
    intituleLigneOption.innerHTML = "OPTIONS";
    ligneOption.appendChild(intituleLigneOption);
    nouveauTableau.appendChild(ligneOption);
   
        //création champs options sélectionnées
        for(var i = 0; i < boiteOption.length; i++) {
            if (boiteOption[i].checked){
                nouveauTableau.appendChild(creerLigne(i+1, options[i], boiteOption[i].value));
                prixTotalOptions += parseFloat(boiteOption[i].value);
            }
        }
    }

    //création ligne Total
    var total = prixTotalOptions+prixProduit;
    if (total > 1000)
    facture.className = "maFacturePlus";
    nouveauTableau.appendChild(creerLigne("TOTAL", total, ""));
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






  // version de fonction plus verbeuse gardée en commentaire pour référence dans le futur
//changement couleur fond champs
/*for (let i = 0; i < champs.length; i++) {
    champs[i].addEventListener("focus", function(){
        this.style.backgroundColor = "orange";
    });
    champs[i].addEventListener("blur", function(){
        this.style.backgroundColor = "white"; 
    })
}*/



