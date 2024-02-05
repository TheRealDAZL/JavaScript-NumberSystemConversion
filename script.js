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

    // Mémoriser la nouvelle valeur de n, s'il y a lieu
    n = validerBasesEtFormaterNombre(n, b1, b2, nEstNegatif)

    // Déclarer et initialiser les variables
    const symboles = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
        "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
        "U", "V", "W", "X", "Y", "Z"]

    // Mémoriser le résultat de la méthode validerNombreEtCalculerValeur(n, b1, symboles)
    // Cette méthode converti n en une somme de valeurs
    let valeurTotale = validerNombreEtCalculerValeur(n, b1, symboles)

    // Mémoriser le résultat de la méthode calculerEtConvertir(valeurTotale, b2, symboles).
    // Cette méthode converti valeurTotale en une combinaison symbole(s)
    let resultatFinal = calculerValeurEtConvertirResultat(valeurTotale, b2, symboles)

    // Enlever la classe msgErreur à l'élément sélectionné, puis afficher le message suivant
    document.getElementById("message").classList.remove("msgErreur")
    document.getElementById("message").textContent = "Nombre converti avec succès"

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

// Méthode qui valide puis évalue la valeur de n
function validerNombreEtCalculerValeur(n, b1, symboles) {
    let valeur = 0
    let exposant = 0

    // Pour chaque symbole présent dans nombre :
    // 1) mémoriser temporairement le symbole dans une variable;
    // 2) mémoriser le résultat de la méthode trouverSymbole(symbole, b1, symboles).
    // Cette méthode valide, puis converti le symbole en nombre,
    // ou retourne -1 si le symbole n'a pas été trouvé;
    // 3) si valeurTemp === -1, alors on affiche des messages d'erreur.
    // Dans les autres cas, on ne fait rien;
    // 4) incrémenter la variable valeurTotale d'une valeur égale au résultat
    // de valeurTemp * Math.pow(b1, exposant);
    // 5) incrémenter la variable exposant de 1
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
function calculerValeurEtConvertirResultat(valeur, base2, symboles) {
    // Si valeur est égal à 0, retourner 0
    if (valeur === 0) {
        return "0"
    }

    // Déclarer et initialiser une variable resultatTemp
    let resultatTemp = ""

    // Convertir la valeur en un string de symbole(s)
    while (valeur > 0) {
        // Déclarer et définir une variable residu à partir de la valeur % base2
        let residu = valeur % base2
        // Concaténer le symbole associé à symboles[residu] avec le(s) résultat(s) précédent(s)
        resultatTemp = symboles[residu] + resultatTemp
        // Mémoriser la valeur associé à Math.floor(valeur / base2) dans la variable valeur
        valeur = Math.floor(valeur / base2)
    }

    return resultatTemp
}