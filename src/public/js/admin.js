document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productForm");
  const table = document.getElementById("productTable");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const productData = {};
    formData.forEach((value, key) => {
      productData[key] = value;
    });

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        window.location.href = "/users/dashboard-admin";
      } else {
        const err = await res.json();
        alert("Error al agregar producto: " + (err.error || res.statusText));
      }
    } catch (err) {
      console.error("Error en el fetch POST:", err);
    }
  });

  table.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const productId = e.target.getAttribute("data-id");
      if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

      try {
        const res = await fetch(`/api/products/${productId}`, {
          method: "DELETE",
        });

        if (res.ok) {
          window.location.href = "/users/dashboard-admin";
        } else {
          const err = await res.json();
          alert("Error al eliminar producto: " + (err.error || res.statusText));
        }
      } catch (err) {
        console.error("Error en el fetch DELETE:", err);
      }
    }
  });
});
