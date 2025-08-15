document.addEventListener("DOMContentLoaded", () => {
  const cartId = document.querySelector(".delete-btn")?.dataset.cartId;
  const productCards = document.querySelectorAll(".delete-btn");

  productCards.forEach(btn => {
    const productId = btn.dataset.id;
    const card = btn.closest("div");

    const quantitySpan = card.querySelector(".quantity-value");
    const increaseBtn = card.querySelector(".increase-btn");
    const decreaseBtn = card.querySelector(".decrease-btn");

    let quantity = parseInt(quantitySpan.dataset.quantity);
    const price = parseFloat(card.querySelector("p:nth-of-type(3)").textContent.replace(/[^\d.]/g, ""));

    // ✅ Aumentar cantidad
    increaseBtn.addEventListener("click", async () => {
      try {
        quantity++;
        const res = await fetch(`/api/carts/${cartId}/products/${productId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity })
        });
        if (res.ok) {
          quantitySpan.textContent = quantity;
          quantitySpan.dataset.quantity = quantity;
          updateCartTotal();
        } else {
          alert("Error al actualizar cantidad");
        }
      } catch (err) {
        console.error(err);
      }
    });

    // ✅ Disminuir cantidad
    decreaseBtn.addEventListener("click", async () => {
      if (quantity > 1) {
        try {
          quantity--;
          const res = await fetch(`/api/carts/${cartId}/products/${productId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantity })
          });
          if (res.ok) {
            quantitySpan.textContent = quantity;
            quantitySpan.dataset.quantity = quantity;
            updateCartTotal();
          } else {
            alert("Error al actualizar cantidad");
          }
        } catch (err) {
          console.error(err);
        }
      }
    });

    // ✅ Eliminar producto
    btn.addEventListener("click", async () => {
      if (confirm("¿Estás seguro de eliminar este producto?")) {
        try {
          const res = await fetch(`/api/carts/${cartId}/products/${productId}`, { method: "DELETE" });
          if (res.ok) {
            card.remove();
            updateCartTotal();
          } else {
            alert("Error al eliminar producto");
          }
        } catch (err) {
          console.error(err);
        }
      }
    });
  });

  function updateCartTotal() {
    const productCards = document.querySelectorAll(".delete-btn");
    let total = 0;
  
    productCards.forEach(btn => {
      const card = btn.closest("div");
      const quantitySpan = card.querySelector(".quantity-value");
      const priceSpan = card.querySelector(".price");
  
      const quantity = parseInt(quantitySpan.textContent.trim());
      const price = parseFloat(priceSpan.dataset.price);
  
      total += price * quantity;
    });
  
    const cartTotalElement = document.getElementById("cart-total");
    cartTotalElement.textContent = `Total del carrito: $${total.toFixed(2)}`;
  }
});
