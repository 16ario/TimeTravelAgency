export function initReservation() {
  const form = document.getElementById("reservation-form");
  const formMessage = document.getElementById("form-message");

  if (!form || !formMessage) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const payload = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      destination: document.getElementById("destination").value,
      date: document.getElementById("date").value,
      message: document.getElementById("message").value.trim()
    };

    formMessage.classList.remove("success", "error");
    formMessage.textContent = "Transmission de la demande au centre de stabilisation temporelle...";

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur réservation");
      }

      formMessage.textContent =
        `Réservation enregistrée sous l’identifiant ${data.reservation.id}. ` +
        `Le transfert vers ${data.reservation.destination} est en attente de stabilisation.`;

      formMessage.classList.add("success");

      form.reset();
    } catch (error) {
      formMessage.textContent =
        error.message || "Impossible d’enregistrer la réservation.";

      formMessage.classList.add("error");

      console.error("Erreur réservation frontend :", error);
    }
  });
}