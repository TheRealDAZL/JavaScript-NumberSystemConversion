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

    // Évaluer si le nombre commence par un tiret
    // Note: cette variable sera réutilisée plus tard,
    // vers la fin de la méthode
    let nEstNegatif = n.startsWith("-")

    // Si nEstNegatif === true ou le nombre commence par un signe positif,
    // alors on ignore le premier symbole du string
    if (nEstNegatif  || n.startsWith("+")) {
        n = n.substring(1)
    }

    // Si n est vide, lancer un message d'erreur
    if (n === "") {
        document.getElementById("extrant").value = "Entrée invalide"
        document.getElementById("message").classList.add("msgErreur")
        document.getElementById("message").textContent = "Erreur : veuillez entrer un nombre"

        throw new Error("Veuillez entrer un nombre")
    }

    // Si n est égal à "0", enlever la classe msgErreur à l'élément sélectionné,
    // ensuite afficher le message suivant, puis retourner 0
    if (n === "0") {
        document.getElementById("message").classList.remove("msgErreur")
        document.getElementById("message").textContent = "Nombre converti avec succès"

        return "0"
    }

    // Déclarer et initialiser les variables
    const symboles = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
        "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
        "U", "V", "W", "X", "Y", "Z"]
    let valeurTotale = 0
    let exposant = 0

    // Pour chaque symbole présent dans nombre :
    // 1) mémoriser temporairement le symbole dans une variable;
    // 2) mémoriser le résultat de la méthode validerEtEvaluer(symbole, b1, symboles).
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
        let valeurTemp = validerEtEvaluer(symbole, b1, symboles)

        if (valeurTemp === -1) {
            document.getElementById("extrant").value = "Entrée invalide"
            document.getElementById("message").classList.add("msgErreur")
            document.getElementById("message").textContent = "Erreur : le symbole entré n'est pas valide"

            throw new Error("Le symbole entré n'est pas valide")
        }

        valeurTotale += valeurTemp * Math.pow(b1, exposant)
        exposant++
    }

    // Mémoriser le résultat de la méthode calculerEtConvertir(valeurTotale, b2, symboles).
    // Cette méthode converti valeurTotale en symbole(s)
    let resultatFinal = calculerEtConvertir(valeurTotale, b2, symboles)

    // Enlever la classe msgErreur à l'élément sélectionné, puis afficher le message suivant
    document.getElementById("message").classList.remove("msgErreur")
    document.getElementById("message").textContent = "Nombre converti avec succès"

    // Si nEstNegatif === true, alors on ajoute un tiret en avant de resultatFinal,
    // puis on retourne le string ainsi formé.
    // Sinon, on retourne uniquement resultatFinal
    return nEstNegatif ? "-" + resultatFinal : resultatFinal
}

// Méthode qui compare les valeurs présentes dans le tableau symboles avec
// le symbole fourni. Si la comparaison est vraie, retourner la valeur
// du compteur.
// Sinon, retourner -1
function validerEtEvaluer(symbole, base1, symboles) {
    for (let compteur = 0; compteur < base1; compteur++) {
        if (symboles[compteur].toString() === symbole.toString()) {
            return compteur
        }
    }

    return -1
}

// Méthode qui converti la valeur fournie en un string qui représente
// le résultat de la conversion
function calculerEtConvertir(valeur, base2, symboles) {
    // Si la valeur est égale à 0, retouner 0 (je pense que ce n'est pas nécessaire?)
    if (valeur === 0) {
        return 0
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