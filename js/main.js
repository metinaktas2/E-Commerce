import fetchProducts from "./api.js";
import { addToCart } from "./cart.js";
import {
  getFromLocalStorage,
  updateCartIcon,
  renderCartTotal,
} from "./helper.js";
import { renderCartItems, renderProducts, uiElements } from "./ui.js";

uiElements.menuIcon.addEventListener("click", () => {
  //uiElements içerisindeki nav elemanına "open" class'ını ekle-çıkar
  uiElements.nav.classList.toggle("open");
});

document.addEventListener("DOMContentLoaded", () => {
  //localStorage'dan  sepetteki ürünleri al
  const cart = getFromLocalStorage("cart");

  if (window.location.pathname.includes("/cart.html")) {
    renderCartItems(cart);
    renderCartTotal(cart);
  } else {
    fetchProducts().then((products) => {
      renderProducts(products, (e) => {
        addToCart(e, products);
      });
    });
  }

  //sepet ikonunu güncelle
  updateCartIcon(cart);
});
