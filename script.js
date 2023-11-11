const TICKET_PRICE = 22;

const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const seatsSelected = document.getElementById("seats-selected");
const button = document.querySelector(".button");

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  const seatNumber = [...selectedSeats].map((el) => el.dataset.seat);

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  if (selectedSeatsCount > 0) {
    button.classList.remove("disabled");
  } else {
    button.classList.add("disabled");
  }

  seatsSelected.innerText = seatNumber.join(", ");
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * TICKET_PRICE;
}

// Get data from Local storage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
}

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("booked") &&
    !e.target.classList.contains("unavailable")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

populateUI();

updateSelectedCount();
