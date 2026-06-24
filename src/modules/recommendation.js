export function initRecommendation() {
  const form = document.getElementById("recommendation-form");
  const result = document.getElementById("recommendation-result");

  if (!form || !result) {
    return;
  }

  function getSelectedText(selectId) {
    const select = document.getElementById(selectId);
    return select.options[select.selectedIndex].textContent;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const payload = {
      experience: getSelectedText("experience"),
      period: getSelectedText("period"),
      environment: getSelectedText("environment"),
      activity: getSelectedText("activity")
    };

    result.innerHTML = `
      <p>Analyse de vos préférences et calcul de la meilleure fenêtre temporelle...</p>
    `;

    try {
      const response = await fetch("/api/recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const recommendation = await response.json();

      if (!response.ok) {
        throw new Error(recommendation.error || "Erreur recommandation");
      }

      result.innerHTML = `
        <h3>${recommendation.title}</h3>

        <p>${recommendation.reason}</p>

        <ul>
          <li><strong>Destination recommandée :</strong> ${recommendation.destination}</li>
          <li><strong>Niveau de risque :</strong> ${recommendation.risk}</li>
          <li><strong>Prix estimé :</strong> ${recommendation.price}</li>
        </ul>

        <button type="button" class="btn" id="recommendation-reserve">
          Réserver ce transfert
        </button>
      `;

      const reserveButton = document.getElementById("recommendation-reserve");

      reserveButton.addEventListener("click", () => {
        const destinationSelect = document.getElementById("destination");

        destinationSelect.value = recommendation.destination;

        document.getElementById("reservation").scrollIntoView({
          behavior: "smooth"
        });
      });
    } catch (error) {
      result.innerHTML = `
        <p class="error">
          Impossible de générer une recommandation IA pour le moment.
          Vérifiez que le backend est lancé.
        </p>
      `;

      console.error("Erreur recommandation frontend :", error);
    }
  });
}