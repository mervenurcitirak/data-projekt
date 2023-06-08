"use strict";

async function fetchData() {
  try {
    const response = await fetch(
      "https://cederdorff.github.io/dat-js/05-data/pokemons.json"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

function renderGrid(data) {
  const gridTable = document.getElementById("gridTable");

  gridTable.innerHTML = "";

  const headerRow = document.createElement("tr");
  Object.keys(data[0]).forEach((property) => {
    const headerCell = document.createElement("th");
    headerCell.textContent = property;
    headerRow.appendChild(headerCell);
  });
  gridTable.appendChild(headerRow);

  data.forEach((item) => {
    const dataRow = document.createElement("tr");
    Object.entries(item).forEach(([key, value]) => {
      const dataCell = document.createElement("td");
      if (key === "image") {
        const imageElement = document.createElement("img");
        imageElement.src = value;
        imageElement.alt = "Image";
        imageElement.classList.add("grid-image");
        dataCell.appendChild(imageElement);
      } else {
        dataCell.textContent = value;
      }
      dataRow.appendChild(dataCell);
    });

    dataRow.addEventListener("click", () => showDetailView(item));
    gridTable.appendChild(dataRow);
  });
}

// detail view
function showDetailView(item) {
  const detailDialog = document.getElementById("detailDialog");
  detailDialog.innerHTML = "";

  Object.entries(item).forEach(([property, value]) => {
    const detailItem = document.createElement("p");
    detailItem.innerHTML = `<strong>${property}:</strong> ${value}`;
    detailDialog.appendChild(detailItem);
  });

  const detailSection = document.getElementById("detailSection");
  detailSection.style.display = "block";

  //close knap
  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.addEventListener("click", hideDetailView);
  detailDialog.appendChild(closeButton);
}

function hideDetailView() {
  const detailSection = document.getElementById("detailSection");
  detailSection.style.display = "none";
}

async function initialize() {
  const data = await fetchData();
  renderGrid(data);
}

initialize();
