import { destinations } from "../data/destinations.js";

export function initDestinationDetails() {
  const detailBox = document.getElementById("destination-details");
  const destinationButtons = document.querySelectorAll(".card-btn");

  if (!detailBox || destinationButtons.length === 0) {
    return;
  }

  destinationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const destinationKey = button.dataset.destination;
      const destination = destinations[destinationKey];

      if (!destination) {
        return;
      }

      detailBox.innerHTML = `
        <h3>${destination.name}</h3>

        <p>${destination.description}</p>

        <video class="destination-video" controls muted loop>
          <source src="${destination.video}" type="video/mp4" />
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>

        <ul>
          <li><strong>Période d’arrivée :</strong> ${destination.period}</li>
          <li><strong>Type de tunnel :</strong> ${destination.tunnel}</li>
          <li><strong>Durée recommandée :</strong> ${destination.duration}</li>
          <li><strong>Niveau de risque :</strong> ${destination.risk}</li>
          <li><strong>Prix estimé :</strong> ${destination.price}</li>
        </ul>

        <h4>Activités proposées</h4>

        <ul>
          ${destination.activities.map((activity) => `<li>${activity}</li>`).join("")}
        </ul>

        <h4>Protocole de sécurité</h4>

        <p>${destination.security}</p>

        <button class="btn reserve-btn" type="button">
          Réserver ce transfert
        </button>
      `;

      const reserveButton = detailBox.querySelector(".reserve-btn");

      reserveButton.addEventListener("click", () => {
        const destinationSelect = document.getElementById("destination");

        destinationSelect.value = destination.name;

        document.getElementById("reservation").scrollIntoView({
          behavior: "smooth"
        });
      });

      document.getElementById("details").scrollIntoView({
        behavior: "smooth"
      });
    });
  });
}