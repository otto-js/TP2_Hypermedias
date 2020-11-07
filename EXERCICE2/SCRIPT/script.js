var champs = document.getElementsByClassName("champs");
var options = document.getElementsByClassName("boiteOption");

for (var i = 0; i < champs.length; i++) {
    champs[i].onfocus = function() { this.style.backgroundColor = "orange"; }
    champs[i].onblur = function() { this.style.backgroundColor = "white"; }
    champs[i].onkeyup = function() { validerChamps(champs); }
}

//affiche message checkbox écran
document.getElementById("ecran").onclick = function(){
    if (this.checked) 
        alert("Vous êtes le roi des bonnes décisions");
    else
        alert("Un bébé panda meurt à chaque fois que vous décochez cette case");
}

function validerChamps(champs) {
    var isValide = true;
    const LES_MESSAGES = [
        "Veuillez entrer un nom",
        "<br>Veuillez entrer un code postal",
        "<br>Veuillez entrer un couriel",
        "<br>Veuillez vérifier votre courriel",
        "Les deux courriels doivent être identiques"
    ]
    var messageAffiche = "";

    for (var i = 0; i < champs.length; i++) {
        if (!champs[i].value) {
            messageAffiche += LES_MESSAGES[i];
            isValide = false;
        }
    }
    if (!messageAffiche){
        if (champs[2].value !== champs[3].value) {
            messageAffiche += LES_MESSAGES[4];
            document.getElementById("message").innerHTML = messageAffiche;
            isValide = false;
        }
    }
    document.getElementById("message").innerHTML = messageAffiche;

    document.getElementById("messageWrapper").style.marginLeft = "-210px";
    if (!messageAffiche)
        document.getElementById("messageWrapper").style.marginLeft = "-560px";
    return isValide;
}

document.getElementById("commander").addEventListener("submit", function(e){
    e.preventDefault();
    if (validerChamps(champs)){ 
        afficherFacture();
        alert("Votre commande a bien été envoyée");
        resetFormulaire();
    }
});

function resetFormulaire(){
    for (var i = 0; i < champs.length; i++){
        champs[i].value = "";
    }
    //uncheck boxes
    for (var i = 0; i < options.length; i++){
        options[i].checked = false; 
    }
    document.getElementById("messageWrapper").style.marginLeft = "-560px";
}

function afficherFacture() {
    var total = 0;
    document.getElementById("messageFacture").innerHTML = "Voici votre facture"

    document.getElementById("enTete").innerHTML = "Merci de faire avec nous " + champs[0].value +
                                              "<br>Votre facture sera envoyée à " + champs[1].value +
                                              "<br>Et un courriel de confirmation à " + champs[2].value;

    var boxChecked = document.querySelectorAll("[type=checkbox]:checked");

    document.querySelectorAll("#machine>td")[1].innerHTML = document.getElementById("selection")[document.getElementById("selection").selectedIndex].innerHTML.split(" ")[0];
    total += parseFloat(document.querySelectorAll("#machine>td")[2].innerHTML = document.getElementById("selection").value);

    //création ligne titre option
    if(boxChecked.length > 0){
        var ligneOption = document.createElement("td");
        document.getElementById("factureTableau").appendChild(
            document.createElement("tr")).appendChild(
                ligneOption).colSpan = "3";
        ligneOption.innerHTML = "OPTIONS";
        }

    //création lignes options
    for (var i = 0; i < boxChecked.length; i++){
        var ligne = document.createElement("tr");
        for (var j = 0; j < 3; j++) {
            var col = document.createElement("td");
            if (j == 0)
                col.innerHTML = j+i+1;
            if (j == 1)
                col.innerHTML = boxChecked[i].parentNode.getElementsByTagName("label")[i].innerHTML.split(" ")[0];
            if (j == 2)
            total += col.innerHTML = parseFloat(boxChecked[i].value + "$");
            ligne.appendChild(col);       
        }
    document.getElementById("factureTableau").appendChild(ligne);
    }

    //création ligne total
    var ligneTotal = document.createElement("tr");
    ligneTotal.appendChild(document.createElement("td")).innerHTML = "TOTAL";
    ligneTotal.appendChild(document.createElement("td")).innerHTML = total + "$";
    document.getElementById("factureTableau").appendChild(ligneTotal);

    if (total > 1000)
    document.getElementById("factureTableau").className = "maFacturePlus"

    document.getElementById("factureWrapper").style.display = "inline";
}


