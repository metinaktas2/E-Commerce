import {
  getFromLocalStorage,
  saveToLocalStorage,
  updateCartIcon,
  renderCartTotal,
} from "./helper.js";
import { renderCartItems } from "./ui.js";

//localStorage'dan cart elemanlarını al
let cart = getFromLocalStorage("cart");

//sepete ürün ekleyen fonksiyon
const addToCart = (e, products) => {
  //tıklanılan elemana ait id'ye eriş
  const productId = Number(e.target.dataset.id);

  //id'si bilinen elemanı products içerisinden bul
  const product = products.find((product) => product.id === productId);

  //sepete eklenecek eleman öncesinde eklendi mi?
  const existingItem = cart.find((item) => item.id === productId);

  //eğer ürün sepete eklendiyse
  if (existingItem) {
    //ürünün miktarını güncelle
    existingItem.quantity++;
  } else {
    //ürünü sepete ekle
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    };

    //sepet dizisine ürün ekle
    cart.push(cartItem);
  }
  //sepeti güncelle
  saveToLocalStorage("cart", cart);

  //ad to cart butonunun içeriğini güncelle
  e.target.textContent = "Added";

  //2 saniye sonra buton içeriğini eski haline çevir
  setTimeout(() => {
    e.target.textContent = "Add to cart";
  }, 350);

  //sepet ikonunu güncelle
  updateCartIcon(cart);
};

//sepetten ürün kaldıran fonksiyon
const removeFromCart = (e) => {
  const response = confirm("Silme işlemini onaylıyor musunuz?");

  //eğer kullanıcı silme işlemini onayladıysa
  if (response) {
    //tıklanılan ürünün id'sine eriş
    const productId = parseInt(e.target.dataset.id);

    //sepetten remove butonuna basılan elemanı kaldır
    cart = cart.filter((item) => item.id !== productId);

    //localStorage'ı güncelle
    saveToLocalStorage("cart", cart);

    //arayüzü renderla
    renderCartItems(cart);

    //sepet ikonunu güncelle
    updateCartIcon(cart);

    //toplam fiyatı renderla
    renderCartTotal(cart);
  }
};

//sepetteki ürün miktarını güncelleyen fonksiyon
const onQuantityChange = (e) => {
  //güncellencek elemanın id'sine eriş
  const productId = +e.target.dataset.id;

  //yeni ürün mitarına eriş
  const newQuantity = e.target.value;

  //yeni miktar 0'dan büyükse
  if (newQuantity > 0) {
    //güncellenecek elemanı dizi içerisinde bul
    const updatedItems = cart.find((item) => item.id === productId);

    //ürün miktarını güncelle
    updatedItems.quantity = newQuantity;

    //localStorage'ı güncelle
    saveToLocalStorage("cart", cart);
  } else {
    removeFromCart(e);
  }

  //sepet ikonunu güncelle
  updateCartIcon(cart);

  //toplam fiyatı renderla
  renderCartTotal(cart);
};

export { addToCart, removeFromCart, onQuantityChange };
