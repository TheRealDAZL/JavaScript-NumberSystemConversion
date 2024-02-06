// Méthode qui mémorise les valeurs entrées par l'utilisateur, puis
// qui affiche le résultat de la méthode validertEtConvertir(nombre, baseInitiale, baseFinale)
function afficher() {
    let nombre = document.getElementById("intrant").value.toUpperCase()
    let baseInitiale = document.getElementById("baseInitiale").value
    let baseFinale = document.getElementById("baseFinale").value

    document.getElementById("extrant").value = validertEtConvertir(nombre, baseInitiale, baseFinale)
}

// Méthode qui effectue la conversion d'un string à un autre
function validertEtConvertir(n, b1, b2) {
    // Évaluer si le nombre commence par un tiret
    // Note: cette variable sera réutilisée plus tard,
    // vers la fin de la méthode
    let nEstNegatif = n.startsWith("-")
    let positionPointOuVirgule = -1

    n = validerBasesEtFormaterNombre(n, b1, b2, nEstNegatif)

    if (!(n.includes(",") && n.includes(".")) && (n.includes(",") || n.includes("."))) {
        if (n.includes(",")) {
            positionPointOuVirgule = nPossedeUneVirgule(n, ",")
        }

        else {
            positionPointOuVirgule = nPossedeUneVirgule(n, ".")
        }
    }

    const symboles = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
        "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
        "U", "V", "W", "X", "Y", "Z"]

    let valeurTotale = validerNombreEtCalculerValeur(n, b1, symboles, positionPointOuVirgule)

    let resultatFinal = calculerValeurEtConvertirResultat(valeurTotale, b2, symboles, positionPointOuVirgule)

    // Enlever la classe msgErreur à l'élément sélectionné, puis afficher le message suivant
    document.getElementById("message").classList.remove("msgErreur")
    document.getElementById("message").textContent = "Nombre converti avec succès"

    if (n.includes(",")) {
        resultatFinal = resultatFinal.replace(".", ",")
    }

    // Si nEstNegatif === true, alors on ajoute un tiret en avant de resultatFinal,
    // puis on retourne le string ainsi formé.
    // Sinon, on retourne uniquement resultatFinal
    return nEstNegatif ? "-" + resultatFinal : resultatFinal
}



// Méthode qui valide les bases entrées et le nombre entré, et qui reformate la valeur de n, si nécessaire
function validerBasesEtFormaterNombre(nombre, b1, b2, nEstNegatif) {
    // Valider les valeurs de la baseInitiale
    if (b1 < 2 || b1 > 36) {
        document.getElementById("extrant").value = "Entrée invalide"
        document.getElementById("message").classList.add("msgErreur")
        document.getElementById("message").textContent = "Erreur : la base doit être entre 2 et 36"

        throw new Error("La base doit être entre 2 et 36")
    }

    // Valider les valeurs de la baseFinale
    if (b2 < 2 || b2 > 36) {
        document.getElementById("extrant").value = "Entrée invalide"
        document.getElementById("message").classList.add("msgErreur")
        document.getElementById("message").textContent = "Erreur : la base doit être entre 2 et 36"

        throw new Error("La base doit être entre 2 et 36")
    }

    // Si nEstNegatif === true ou le nombre commence par un signe positif,
    // alors on ignore le premier symbole du string
    if (nEstNegatif  || nombre.startsWith("+")) {
        nombre = nombre.substring(1)
    }

    // Si n est vide, lancer un message d'erreur
    if (nombre === "") {
        document.getElementById("extrant").value = "Entrée invalide"
        document.getElementById("message").classList.add("msgErreur")
        document.getElementById("message").innerHTML = "Erreur : veuillez entrer un nombre entier, <br>" +
            "représenté dans une base entière de 2 jusqu'à 36"

        throw new Error("Le nombre entré doit être un nombre entier, représenté dans une base entière de 2 jusqu'à 36")
    }

    return nombre
}

function nPossedeUneVirgule(nombre, pointOuVirgule) {
    let index = nombre.indexOf(pointOuVirgule)

    if (index === nombre.lastIndexOf(pointOuVirgule)) {
        return index
    }

    else {
        document.getElementById("extrant").value = "Entrée invalide"
        document.getElementById("message").classList.add("msgErreur")
        document.getElementById("message").innerHTML = "Erreur : veuillez entrer un nombre entier, <br>" +
            "représenté dans une base entière de 2 jusqu'à 36"
        throw new Error()
    }
}

// Méthode qui valide puis évalue la valeur de n
function validerNombreEtCalculerValeur(n, b1, symboles, positionPointOuVirgule) {
    if (positionPointOuVirgule !== -1) {
        let valeur = 0
        let exposant = positionPointOuVirgule + 1 - n.length

        for (let position = n.length - 1; position >= 0; position--)
        {
            if (position === positionPointOuVirgule) {
                continue;
            }

            let symbole = n[position]
            let valeurTemp = trouverSymbole(symbole, b1, symboles)

            if (valeurTemp === -1) {
                document.getElementById("extrant").value = "Entrée invalide"
                document.getElementById("message").classList.add("msgErreur")
                document.getElementById("message").innerHTML = "Erreur : veuillez entrer un nombre entier, <br>" +
                    "représenté dans une base entière de 2 jusqu'à 36"

                throw new Error("Le nombre entré contient des symboles illégaux")
            }

            valeur += valeurTemp * Math.pow(b1, exposant)
            exposant++
        }

        return valeur
    }

    else {
        let valeur = 0
        let exposant = 0

        for (let position = n.length - 1; position >= 0; position--)
        {
            let symbole = n[position]
            let valeurTemp = trouverSymbole(symbole, b1, symboles)

            if (valeurTemp === -1) {
                document.getElementById("extrant").value = "Entrée invalide"
                document.getElementById("message").classList.add("msgErreur")
                document.getElementById("message").innerHTML = "Erreur : veuillez entrer un nombre entier, <br>" +
                    "représenté dans une base entière de 2 jusqu'à 36"

                throw new Error("Le nombre entré contient des symboles illégaux")
            }

            valeur += valeurTemp * Math.pow(b1, exposant)
            exposant++
        }

        return valeur
    }
}

// Méthode qui compare les valeurs présentes dans le tableau symboles avec
// le symbole fourni. Si la comparaison est vraie, retourner la valeur
// du compteur.
// Sinon, retourner -1
function trouverSymbole(symbole, base1, symboles) {
    for (let compteur = 0; compteur < base1; compteur++) {
        if (symboles[compteur].toString() === symbole.toString()) {
            return compteur
        }
    }

    return -1
}

// Méthode qui converti la valeur fournie en un string qui représente
// le résultat de la conversion
function calculerValeurEtConvertirResultat(valeur, base2, symboles, positionPointOuVirgule) {
    // Si valeur est égal à 0, retourner 0
    if (valeur === 0) {
        return "0"
    }

    if (positionPointOuVirgule !== -1) {
        let resultatTemp= ""
        let tableau = valeur.toString().split(".")
        let compteurPrecision = 0 // À cause de l'erreur machine

        tableau[1] = "0." + tableau[1]

        while (tableau[1] > 0 && compteurPrecision < 14) {
            let residu = Math.floor(tableau[1] * base2)
            resultatTemp += symboles[residu].toString()
            tableau[1] = tableau[1] * base2 - residu

            compteurPrecision++
        }

        if (resultatTemp !== "") {
            resultatTemp = "." + resultatTemp
        }

        if (tableau[0].toString() === "0" || tableau[0].toString() === "") {
            resultatTemp = "0" + resultatTemp
        }

        while (tableau[0] > 0) {
            let residu = tableau[0] % base2
            resultatTemp = String(symboles[residu]) + resultatTemp
            tableau[0] = Math.floor(tableau[0] / base2)
        }


        return resultatTemp
    }

    else {
        let resultatTemp = ""

        while (valeur > 0) {
            let residu = valeur % base2
            resultatTemp = symboles[residu] + resultatTemp
            valeur = Math.floor(valeur / base2)
        }

        return resultatTemp
    }

}