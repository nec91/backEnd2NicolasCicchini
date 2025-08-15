document.addEventListener("DOMContentLoaded", () => {
  const rows = document.querySelectorAll("tbody tr");
  const productQuantities = {};

  rows.forEach(row => {
    const decreaseBtn = row.querySelector(".decrease-btn");
    const increaseBtn = row.querySelector(".increase-btn");
    const quantitySpan = row.querySelector(".quantity-value");
    const productId = row.dataset.productId;
    const maxStock = parseInt(row.querySelector("td:nth-child(4)").innerText);

    let quantity = 0;
    quantitySpan.textContent = quantity;
    productQuantities[productId] = quantity;

    decreaseBtn.addEventListener("click", () => {
      if (quantity > 0) {
        quantity--;
        quantitySpan.textContent = quantity;
        productQuantities[productId] = quantity;
      }
    });

    increaseBtn.addEventListener("click", () => {
      if (quantity < maxStock) {
        quantity++;
        quantitySpan.textContent = quantity;
        productQuantities[productId] = quantity;
      }
    });
  });

  const finalizeForm = document.getElementById("finalizePurchaseForm");
  finalizeForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const resCart = await fetch("/api/carts", { 
        method: "POST", 
        credentials: "include" 
      });

      if (!resCart.ok) throw new Error("Error creando carrito");

      const dataCart = await resCart.json();
      const cartId = dataCart.carrito._id;

      localStorage.setItem("cartId", cartId);

      const addPromises = [];
      for (const [productId, qty] of Object.entries(productQuantities)) {
        if (qty > 0) {
          addPromises.push(
            fetch(`/api/carts/${cartId}/products/${productId}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ quantity: qty }),
              credentials: "include" 
            })
          );
        }
      }
      await Promise.all(addPromises);
      window.location.href = `/users/purchase/cart?cartId=${cartId}`;

    } catch (err) {
      console.error("Error al ir al carrito:", err);
      alert("Ocurrió un error al ir al carrito.");
    }
  });
});
