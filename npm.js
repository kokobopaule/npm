const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");

const rl = readline.createInterface({ input, output });

const plats = {
  1: { nom: "Attiéké-poisson", prix: 1500 },
  2: { nom: "Riz-poulet", prix: 2000 },
  3: { nom: "Alloco-oeuf", prix: 1000 }
};

const calculerTotal = (prixUnitaire, quantite) => prixUnitaire * quantite;

async function demanderEntier(message, estValide) {
  while (true) {
    const valeur = Number((await rl.question(message)).trim());
    if (Number.isInteger(valeur) && estValide(valeur)) {
      return valeur;
    }
    console.log("Valeur invalide. Veuillez réessayer.");
  }
}

async function main() {
  try {
    let client = "";
    while (!client) {
      client = (await rl.question("Entrez votre nom : ")).trim();
      if (!client) {
        console.log("Le nom ne peut pas être vide.");
      }
    }

    console.log("\nPlats disponibles :");
    for (const [code, plat] of Object.entries(plats)) {
      console.log(`${code}. ${plat.nom} - ${plat.prix} FCFA`);
    }

    const codePlat = await demanderEntier("Choisissez le code du plat (1 à 3) : ", (code) => code >= 1 && code <= 3);
    const quantite = await demanderEntier("Entrez la quantité (entier positif) : ", (nombre) => nombre > 0);
    const montantVerse = await demanderEntier("Entrez le montant versé en FCFA : ", (montant) => montant >= 0);

    const platChoisi = plats[codePlat];
    const total = calculerTotal(platChoisi.prix, quantite);

    console.log(`\nClient : ${client}`);
    for (let i = 1; i <= quantite; i++) {
      console.log(`Portion ${i} : ${platChoisi.nom} - ${platChoisi.prix} FCFA`);
    }
    console.log(`Total à payer : ${total} FCFA`);
    console.log(`Montant versé : ${montantVerse} FCFA`);

    if (montantVerse >= total) {
      console.log(`Monnaie à rendre : ${montantVerse - total} FCFA`);
    } else {
      console.log(`Montant manquant : ${total - montantVerse} FCFA`);
    }
  } finally {
    rl.close();
  }
}

main();
