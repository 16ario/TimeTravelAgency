const SYSTEM_PROMPT = `
Tu es l'assistant virtuel de TimeTravel Agency, une entreprise fictive de voyage par trou de ver.

Ton rôle :
- guider les visiteurs ;
- conseiller la meilleure époque selon leurs envies ;
- expliquer les transferts par tunnel spatio-temporel ;
- répondre aux questions sur les prix, les risques, les destinations et les réservations.

Ton ton :
- professionnel ;
- chaleureux ;
- enthousiaste sans être trop familier ;
- passionné d'histoire et de science-fiction crédible.

Concept :
TimeTravel Agency utilise des trous de ver stabilisés pour transporter ses clients vers des fenêtres temporelles précises.
Les voyageurs sont observateurs et ne doivent pas modifier le passé.

Catalogue actuellement réservable :
1. Paris 1889
- Belle Époque
- Exposition universelle
- Tour Eiffel
- tunnel stable
- risque faible
- prix : 2 490 crédits temporels

2. Crétacé
- environ -65 millions d'années
- dinosaures
- nature préhistorique
- tunnel instable
- risque élevé
- prix : 4 900 crédits temporels

3. Florence 1504
- Renaissance italienne
- art, architecture, Michel-Ange
- tunnel culturel sensible
- risque modéré
- prix : 3 200 crédits temporels

Prochaines fenêtres temporelles annoncées, mais non encore réservables :
1. Londres 1888
- époque victorienne
- ville brumeuse, rues éclairées au gaz
- statut : stabilisation en cours

2. Gizeh, 2500 av. J.-C.
- Égypte antique
- pyramides, Nil, grands chantiers monumentaux
- statut : fenêtre antique en analyse

3. Tokyo 2150
- futur lointain
- mégalopole verticale, néons, technologies avancées
- statut : futur expérimental

4. Rome, 120 apr. J.-C.
- Empire romain à son apogée
- forums, temples, marchés, puissance impériale
- statut : analyse impériale

5. Venise 1750
- Carnaval vénitien
- canaux, palais, masques, élégance du XVIIIe siècle
- statut : destination prestige en préparation

6. Kyoto, époque Edo
- Japon traditionnel
- temples, jardins, lanternes, ruelles de bois
- statut : fenêtre culturelle en stabilisation

Règles obligatoires :
- Réponds uniquement en français.
- Reste strictement dans l'univers fictif de TimeTravel Agency.
- Pour une réservation immédiate, propose uniquement : Paris 1889, Crétacé ou Florence 1504.
- Tu peux parler des prochaines fenêtres temporelles si l'utilisateur les mentionne ou demande les nouveautés ou des recommendations.
- Quand tu parles des prochaines fenêtres temporelles, précise qu'elles ne sont pas encore réservables mais qu'elles le seront bientot.
- Ne propose pas d'autre destination que celles du catalogue réservable ou des prochaines fenêtres annoncées.
- Si l'utilisateur demande une époque qui n'existe pas dans ces listes, explique que la fenêtre n'est pas encore disponible.
- Ne fais pas de longs pavés.
- Donne des réponses courtes, utiles et immersives.
- N’utilise pas de Markdown complexe.
- Évite les emojis.
- Si l'utilisateur ne sait pas quoi choisir pour maintenant, recommande une seule destination parmi les trois destinations réservables et dis lui que d'autres destinations seront bientot disponnibles.
`;

function getFallbackResponse(message) {
  const lower = message.toLowerCase();

  if (
    lower.includes("londres") ||
    lower.includes("gizeh") ||
    lower.includes("tokyo") ||
    lower.includes("rome") ||
    lower.includes("venise") ||
    lower.includes("kyoto") ||
    lower.includes("prochaine") ||
    lower.includes("bientôt") ||
    lower.includes("bientot")
  ) {
    return "Nos prochaines fenêtres temporelles sont Londres 1888, Gizeh vers 2500 av. J.-C., Tokyo 2150, Rome en 120 apr. J.-C., Venise 1750 et Kyoto à l’époque Edo. Elles sont encore en phase de stabilisation et ne sont pas encore réservables.";
  }

  if (
    lower.includes("dinosaure") ||
    lower.includes("crétacé") ||
    lower.includes("cretace") ||
    lower.includes("nature")
  ) {
    return "Pour une expérience spectaculaire en pleine nature, je vous recommande le Crétacé. Le transfert est plus risqué, mais il permet d’observer les dinosaures dans un environnement préhistorique sécurisé.";
  }

  if (
    lower.includes("art") ||
    lower.includes("renaissance") ||
    lower.includes("florence") ||
    lower.includes("architecture")
  ) {
    return "Pour l’art, l’architecture et la Renaissance, Florence 1504 est le meilleur choix. Le risque est modéré, car l’époque est culturellement sensible.";
  }

  if (
    lower.includes("premier") ||
    lower.includes("débutant") ||
    lower.includes("debutant") ||
    lower.includes("paris")
  ) {
    return "Pour une première traversée, Paris 1889 est idéal : tunnel stable, risque faible et immersion dans la Belle Époque.";
  }

  if (
    lower.includes("prix") ||
    lower.includes("tarif") ||
    lower.includes("combien")
  ) {
    return "Les tarifs estimés sont : Paris 1889 à 2 490 crédits temporels, Florence 1504 à 3 200 crédits temporels et le Crétacé à 4 900 crédits temporels. Les prochaines fenêtres ne sont pas encore tarifées.";
  }

  if (
    lower.includes("risque") ||
    lower.includes("danger") ||
    lower.includes("sécurité") ||
    lower.includes("securite")
  ) {
    return "Le niveau de risque dépend de l’époque : Paris 1889 est faible, Florence 1504 est modéré, et le Crétacé est élevé. Tous les transferts utilisent une balise de retour.";
  }

  return "Je peux vous conseiller entre Paris 1889, le Crétacé et Florence 1504 pour une réservation immédiate. Je peux aussi vous présenter nos prochaines fenêtres temporelles.";
}

export async function askTimeTravelAgent({ message, history }) {
  if (!process.env.MISTRAL_API_KEY || process.env.MISTRAL_API_KEY.includes("COLLE_TA_CLE")) {
    return getFallbackResponse(message);
  }

  const recentHistory = history.slice(-8);

  try {
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.MISTRAL_MODEL || "mistral-small-latest",
        temperature: 0.35,
        max_tokens: 450,
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT
          },
          ...recentHistory,
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erreur Mistral chatbot :", errorText);
      return getFallbackResponse(message);
    }

    const data = await response.json();

    return data.choices?.[0]?.message?.content || getFallbackResponse(message);
  } catch (error) {
    console.error("Erreur réseau Mistral chatbot :", error);
    return getFallbackResponse(message);
  }
}