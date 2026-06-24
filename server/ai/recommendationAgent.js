function getFallbackRecommendation(answers) {
  const values = Object.values(answers).join(" ").toLowerCase();

  const scores = {
    "Paris 1889": 0,
    "Crétacé": 0,
    "Florence 1504": 0
  };

  if (
    values.includes("nature") ||
    values.includes("aventure") ||
    values.includes("faune") ||
    values.includes("origines")
  ) {
    scores["Crétacé"] += 2;
  }

  if (
    values.includes("art") ||
    values.includes("architecture") ||
    values.includes("renaissance") ||
    values.includes("culturelle")
  ) {
    scores["Florence 1504"] += 2;
  }

  if (
    values.includes("élégance") ||
    values.includes("elegance") ||
    values.includes("raffinement") ||
    values.includes("moderne") ||
    values.includes("ville") ||
    values.includes("monuments")
  ) {
    scores["Paris 1889"] += 2;
  }

  const destination = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];

  const recommendations = {
    "Paris 1889": {
      destination: "Paris 1889",
      title: "Paris 1889 — La traversée idéale pour débuter",
      reason:
        "Votre profil correspond à une expérience élégante, urbaine et historique. Paris 1889 offre un tunnel stable, un risque faible et une immersion accessible dans la Belle Époque.",
      risk: "Faible",
      price: "2 490 crédits temporels"
    },

    "Crétacé": {
      destination: "Crétacé",
      title: "Crétacé — L’expédition temporelle la plus spectaculaire",
      reason:
        "Votre profil correspond à une aventure sauvage et immersive. Le Crétacé est recommandé pour observer la faune préhistorique et explorer une nature primitive.",
      risk: "Élevé",
      price: "4 900 crédits temporels"
    },

    "Florence 1504": {
      destination: "Florence 1504",
      title: "Florence 1504 — Le passage culturel par excellence",
      reason:
        "Votre profil correspond à une expérience artistique et culturelle. Florence 1504 est idéale pour découvrir la Renaissance italienne, les ateliers et l’architecture.",
      risk: "Modéré",
      price: "3 200 crédits temporels"
    }
  };

  return recommendations[destination];
}

export async function generateRecommendation(answers) {
  if (!process.env.MISTRAL_API_KEY || process.env.MISTRAL_API_KEY.includes("COLLE_TA_CLE")) {
    return getFallbackRecommendation(answers);
  }

  const prompt = `
Tu es un conseiller IA de TimeTravel Agency.

Analyse les préférences du client et recommande UNE seule destination parmi :
- Paris 1889
- Crétacé
- Florence 1504

Réponses du client :
- Type d'expérience : ${answers.experience}
- Période préférée : ${answers.period}
- Environnement préféré : ${answers.environment}
- Activité idéale : ${answers.activity}

Contraintes :
- Réponds uniquement en JSON valide.
- Ne mets aucun texte avant ou après le JSON.
- La destination doit être exactement l'une des trois proposées.

Structure attendue :
{
  "destination": "Paris 1889 | Crétacé | Florence 1504",
  "title": "titre court",
  "reason": "explication personnalisée en 2 ou 3 phrases",
  "risk": "Faible | Modéré | Élevé",
  "price": "prix estimé"
}
`;

  try {
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.MISTRAL_MODEL || "mistral-small-latest",
        temperature: 0.3,
        max_tokens: 500,
        response_format: {
          type: "json_object"
        },
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erreur Mistral recommandation :", errorText);
      return getFallbackRecommendation(answers);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return getFallbackRecommendation(answers);
    }

    return JSON.parse(content);
  } catch (error) {
    console.error("Erreur recommandation IA :", error);
    return getFallbackRecommendation(answers);
  }
}