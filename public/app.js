const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const results = document.getElementById("results");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const search = input.value.trim();

    if (!search) {
      results.innerHTML = "<p>Digite o que você procura.</p>";
      return;
    }

    results.innerHTML = "<p>🔎 Procurando clientes...</p>";

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(search)}`
      );

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        results.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        return;
      }

      results.innerHTML = data.results
        .map(
          (item) => `
            <div class="result">
              <h3>${item.name || "Empresa"}</h3>
              <p>${item.address || ""}</p>
              ${
                item.phone
                  ? `<p>📞 ${item.phone}</p>`
                  : ""
              }
              ${
                item.website
                  ? `<a href="${item.website}" target="_blank">
                      Visitar site
                    </a>`
                  : ""
              }
            </div>
          `
        )
        .join("");
    } catch (error) {
      console.error(error);
      results.innerHTML =
        "<p>Erro ao buscar. Tente novamente.</p>";
    }
  });
}
