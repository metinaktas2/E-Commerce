import { onQuantityChange, removeFromCart } from "./cart.js";

//ui elemanlarını bir arada tutan obje
const uiElements = {
  menuIcon: document.querySelector("#menu-icon"),
  nav: document.querySelector("nav"),
  productList: document.querySelector(".product-container"),
  basketItemsContainer: document.querySelector(".cart-items"),
  cartIcon: document.querySelector(".bi-cart-fill"),
  cartTotal: document.querySelector(".cart-total span"),
};

//products card render eden fonksiyon
const renderProducts = (product, callBackFunction) => {
  //parametre olarak verilen product'ı dön ve her elemam için bir html oluştur
  const productsHtml = product
    .map(
      (product) => `<div class="product">
          <img
            src="${product.image}"
            alt="card-image"
          />

          <div class="product-info">
            <h2>${product.title}</h2>
            <p>${product.price}</p>
            <a data-id="${product.id}" class="add-to-cart">Add to cart</a>
          </div>
        </div>`
    )
    .join("");

  //oluşturulan html'i arayüze aktar
  uiElements.productList.innerHTML = productsHtml;

  //Add to cart elemanlarına eriş
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", callBackFunction);
  });
};

//sepetteki ürünleri renderlayan fonksiyon
const renderCartItems = (cart) => {
  const cartItemHtml =
    cart.length > 0
      ? cart
          .map(
            (item) => ` <div class="cart-item">
            <img
              src="${item.image}"
              alt="cart-item-image"
            />
            <div class="cart-item-info">
              <h2>${item.title}</h2>
              <input
                type="number"
                min="1"
                value="${item.quantity}"
                class="cart-item-quantity"
                data-id="${item.id}"
              />
            </div>

            <h3 class="cart-item-price">${item.price}</h3>
            <button data-id="${item.id}" class="remove-btn">Remove</button>
          </div>`
          )
          .join("")
      : `
<div class="card">
  <svg class="wave" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0,256L11.4,240C22.9,224,46,192,69,192C91.4,192,114,224,137,234.7C160,245,183,235,206,213.3C228.6,192,251,160,274,149.3C297.1,139,320,149,343,181.3C365.7,213,389,267,411,282.7C434.3,299,457,277,480,250.7C502.9,224,526,192,549,181.3C571.4,171,594,181,617,208C640,235,663,277,686,256C708.6,235,731,149,754,122.7C777.1,96,800,128,823,165.3C845.7,203,869,245,891,224C914.3,203,937,117,960,112C982.9,107,1006,181,1029,197.3C1051.4,213,1074,171,1097,144C1120,117,1143,107,1166,133.3C1188.6,160,1211,224,1234,218.7C1257.1,213,1280,139,1303,133.3C1325.7,128,1349,192,1371,192C1394.3,192,1417,128,1429,96L1440,64L1440,320L1428.6,320C1417.1,320,1394,320,1371,320C1348.6,320,1326,320,1303,320C1280,320,1257,320,1234,320C1211.4,320,1189,320,1166,320C1142.9,320,1120,320,1097,320C1074.3,320,1051,320,1029,320C1005.7,320,983,320,960,320C937.1,320,914,320,891,320C868.6,320,846,320,823,320C800,320,777,320,754,320C731.4,320,709,320,686,320C662.9,320,640,320,617,320C594.3,320,571,320,549,320C525.7,320,503,320,480,320C457.1,320,434,320,411,320C388.6,320,366,320,343,320C320,320,297,320,274,320C251.4,320,229,320,206,320C182.9,320,160,320,137,320C114.3,320,91,320,69,320C45.7,320,23,320,11,320L0,320Z"
      fill-opacity="1"
    ></path>
  </svg>

  <div class="icon-container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      stroke-width="0"
      fill="currentColor"
      stroke="currentColor"
      class="icon"
    >
      <path
        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
      ></path>
    </svg>
  </div>
  <div class="message-text-container">
    <p class="message-text">No products found in the cart</p>
    <p class="sub-text">Something went wrong</p>
    <a href='/'>Go to homepage</a>
  </div>
  
</div>
`;

  //oluşturlan html'i basketItemsContainer içerisine aktar
  uiElements.basketItemsContainer.innerHTML = cartItemHtml;

  //remove-btn classına sahip elemanlara eriş
  const removeButtons = document.querySelectorAll(".remove-btn");

  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      removeFromCart(e);
    });
  });

  //quantity inputlarına eriş
  const quantityInputs = document.querySelectorAll(".cart-item-quantity");

  quantityInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      onQuantityChange(e);
    });
  });
};

export { uiElements, renderProducts, renderCartItems };
