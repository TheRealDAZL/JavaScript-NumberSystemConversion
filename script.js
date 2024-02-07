// Méthode qui mémorise les valeurs entrées par l'utilisateur, puis
// qui affiche le résultat de la méthode validertEtConvertir(nombre, baseInitiale, baseFinale)
function afficher() {
    let nombre = document.getElementById("intrant").value.toUpperCase()
    let baseInitiale = document.getElementById("baseInitiale").value
    let baseFinale = document.getElementById("baseFinale").value

    document.getElementById("extrant").value = validertEtConvertir(nombre, baseInitiale, baseFinale)
}

// Méthode qui effectue la conversion d'un string vers un autre string
function validertEtConvertir(n, b1, b2) {
    // Évaluer si le nombre commence par un signe négatif
    // Note: cette variable sera réutilisée plus tard, vers la fin de la méthode
    let nEstNegatif = n.startsWith("-")
    // Variable qui donne la position d'une virgule ou d'un point, s'il n'y en a qu'un(e) seul(e)
    let positionPointOuVirgule = -1

    n = validerBasesEtFormaterNombre(n, b1, b2, nEstNegatif)

    // Si n contient une virgule ou un point, mais pas les deux en même temps,
    // trouver la position de la virgule ou du point
    if (!(n.includes(",") && n.includes(".")) && (n.includes(",") || n.includes("."))) {
        if (n.includes(",")) {
            positionPointOuVirgule = nPossedeUneVirgule(n, ",")
        }

        else {
            positionPointOuVirgule = nPossedeUneVirgule(n, ".")
        }
    }

    // Si n contient au moins une virgule et au moins un point en même temps,
    // lancer une erreur
    else if (n.includes(",") && n.includes(".")) {
        document.getElementById("extrant").value = "Entrée invalide"
        document.getElementById("message").classList.add("msgErreur")
        document.getElementById("message").innerHTML = "Erreur : veuillez entrer un nombre représenté <br>" +
            "dans une base entière de 2 jusqu'à 36"

        throw new Error("Le nombre entré contient au moins une virgule et au moins un point en même temps")
    }

    const symboles = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
        "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
        "U", "V", "W", "X", "Y", "Z"]

    let valeurTotale = validerNombreEtCalculerValeur(n, b1, symboles, positionPointOuVirgule)

    let resultatFinal = calculerValeurEtConvertirResultat(valeurTotale, b2, symboles)

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

    // Si nEstNegatif === true ou que le nombre commence par un signe positif,
    // alors on ignore le premier symbole du string
    if (nEstNegatif  || nombre.startsWith("+")) {
        nombre = nombre.substring(1)
    }

    // Si n est vide, lancer un message d'erreur
    if (nombre === "") {
        document.getElementById("extrant").value = "Entrée invalide"
        document.getElementById("message").classList.add("msgErreur")
        document.getElementById("message").innerHTML = "Erreur : veuillez entrer un nombre représenté <br>" +
            "dans une base entière de 2 jusqu'à 36"

        throw new Error("Le nombre entré doit être représenté dans une base entière de 2 jusqu'à 36")
    }

    return nombre
}

// Méthode qui retourne l'index de la virgule ou du point trouvé, s'il n'y en a qu'un(e) seul(e).
// Sinon la méthode lance une erreur
function nPossedeUneVirgule(nombre, pointOuVirgule) {
    let index = nombre.indexOf(pointOuVirgule)

    if (index === nombre.lastIndexOf(pointOuVirgule)) {
        return index
    }

    else {
        document.getElementById("extrant").value = "Entrée invalide"
        document.getElementById("message").classList.add("msgErreur")
        document.getElementById("message").innerHTML = "Erreur : veuillez entrer un nombre représenté <br>" +
            "dans une base entière de 2 jusqu'à 36"
        throw new Error("Le nombre entré contient plus d'une virgule ou plus d'un point")
    }
}

// Méthode qui valide puis évalue la valeur de n
function validerNombreEtCalculerValeur(n, b1, symboles, positionPointOuVirgule) {
    let valeur = 0
    let exposant

    // S'il n'y a pas de point ou de virgule
    if (positionPointOuVirgule === -1) {
        exposant = 0
    }

    // S'il y a un point ou une virgule
    else {
        exposant = positionPointOuVirgule + 1 - n.length
    }

    for (let position = n.length - 1; position >= 0; position--)
    {
        // Si le prochain symbole est le point ou la virgule en question, continue
        if (position === positionPointOuVirgule) {
            continue;
        }

        let symbole = n[position]
        // Trouver puis convertir le symbole en valeur numérique, s'il y a lieu.
        // Sinon retourner une erreur
        let valeurTemp = trouverSymbole(symbole, b1, symboles)

        if (valeurTemp === -1) {
            document.getElementById("extrant").value = "Entrée invalide"
            document.getElementById("message").classList.add("msgErreur")
            document.getElementById("message").innerHTML = "Erreur : veuillez entrer un nombre représenté <br>" +
                "dans une base entière de 2 jusqu'à 36"

            throw new Error("Le nombre entré contient des symboles illégaux")
        }

        // Faire le total des valeurs récupérées
        valeur += valeurTemp * Math.pow(b1, exposant)
        // Incrémenter l'exposant de 1
        exposant++
    }

    return valeur
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

    // Si on ne trouve pas le symbole récupéré, retourner -1
    return -1
}

// Méthode qui converti la valeur fournie en un string qui représente
// le résultat de la conversion
function calculerValeurEtConvertirResultat(valeur, base2, symboles) {
    let resultatTemp= ""
    let tableau = valeur.toString().split(".")

    // Si le nombre possède des décimales
    if (tableau.length > 1) {
        let compteurPrecision = 0 // À cause de l'erreur machine
        tableau[1] = Number("0." + tableau[1])

        while (tableau[1] > 0 && compteurPrecision < 15) {
            let entier = Math.floor(tableau[1] * base2)
            resultatTemp += symboles[entier].toString()
            tableau[1] = tableau[1] * base2 - entier

            compteurPrecision++
        }

        if (resultatTemp !== "") {
            resultatTemp = "." + resultatTemp
        }

        else {
            resultatTemp = ".0"
        }
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