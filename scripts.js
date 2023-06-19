const itemsPerPage = 650; // Number of items to display per page
const maxVisiblePages = 5; // Maximum number of visible page links
const app = document.getElementById("app");
const pagination = document.getElementById("pagination");
const currentPageElement = document.getElementById("currentPageElement");
const totalPagesElement = document.getElementById("totalPagesElement");

fetch("websitez.txt")
  .then((response) => response.text())
  .then((text) => {
    const websites = text.split("\n");
    const totalPages = Math.ceil(websites.length / itemsPerPage);
    let currentPage = 1;

    function displayWebsites() {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const websitesToDisplay = websites.slice(startIndex, endIndex);

      app.innerHTML = "";

      websitesToDisplay.forEach((website) => {
        if (website) {
          const link = document.createElement("a");
          link.href = "https://" + website;
          link.target = "_blank";
          const name = website.split(".")[0];
          link.innerHTML = `<img src="https://icons.duckduckgo.com/ip3/${website}.ico" alt="${name}" loading="lazy">${name}`;
          app.appendChild(link);
        }
      });
    }

    function displayPagination() {
pagination.innerHTML = "";

const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

if (startPage > 1) {
const prevLink = document.createElement("a");
prevLink.href = "#";
prevLink.textContent = "Prev";
prevLink.addEventListener("click", () => {
currentPage = currentPage - 1;
displayWebsites();
displayPagination();
});
pagination.appendChild(prevLink);
}

for (let i = startPage; i <= endPage; i++) {
const pageLink = document.createElement("a");
pageLink.href = "#";
pageLink.textContent = i;

if (i === currentPage) {
pageLink.classList.add("active");
}

pageLink.addEventListener("click", () => {
currentPage = i;
displayWebsites();
displayPagination();
});

pagination.appendChild(pageLink);
}

const lastPageLink = document.createElement("a");
lastPageLink.href = "#";
lastPageLink.textContent = totalPages;
lastPageLink.addEventListener("click", () => {
currentPage = totalPages;
displayWebsites();
displayPagination();
});
pagination.appendChild(lastPageLink);

if (endPage < totalPages) {
const nextLink = document.createElement("a");
nextLink.href = "#";
nextLink.textContent = "Next";
nextLink.addEventListener("click", () => {
currentPage = currentPage + 1;
displayWebsites();
displayPagination();
});
pagination.appendChild(nextLink);
}




      currentPageElement.textContent = currentPage;

      const goToPageInput = document.createElement("input");
      goToPageInput.type = "number";
      goToPageInput.min = 1;
      goToPageInput.max = totalPages;
      goToPageInput.value = currentPage;
      pagination.appendChild(goToPageInput);

      const goToPageButton = document.createElement("button");
      goToPageButton.textContent = "Go";
      goToPageButton.addEventListener("click", () => {
        const page = parseInt(goToPageInput.value, 10);
        if (page >= 1 && page <= totalPages) {
          currentPage = page;
          displayWebsites();
          displayPagination();
        }
      });
      pagination.appendChild(goToPageButton);
    }

    displayWebsites();
    displayPagination();
  });
