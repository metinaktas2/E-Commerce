import { uiElements } from "./ui.js";

//localStorage'a kayıt yapacak fonksiyon
const saveToLocalStorage = (key, cart) => {
  //dışarıdan verilen key değeri ve cart dizisi ile locale ekleme yap
  localStorage.setItem(key, JSON.stringify(cart));
};

//localStorage'dan elemanları alacak fonksiyon
const getFromLocalStorage = (key) => {
  //localStorage'dan belirtilen key'e sahip elemanları al ve js  objesine çevirip return et
  const strData = localStorage.getItem(key);

  return strData ? JSON.parse(strData) : [];
};

//sepetteki ürün miktarını hesaplayarak sepet ikonu yanındaki miktarı güncelleyen fonksiyon

const updateCartIcon = (cart) => {
  //reduce ile dizideki elemanların toplam miktarını hesapla
  const totalQuantity = cart.reduce(
    (total, item) => total + parseInt(item.quantity),
    0
  );

  //elde edilen ürün miktarını sepet ikonu kısmında yazdır
  uiElements.cartIcon.setAttribute("data-quantity", totalQuantity);
};

//sepetteki toplam ürün fiyatını hesapla
const calculateCartTotal = (cart) =>
  cart.reduce((total, product) => total + product.price * product.quantity, 0);
//toplam ürün fiyatını render eden fonksiyon
const renderCartTotal = (cart) => {
  //toplam fiyata eriş
  const totalPrice = calculateCartTotal(cart);

  const cargofee = 50.0;

  //sepetteki toplam ürünlerin fiyatını render et
  uiElements.cartTotal.textContent =
    //totalprice 100'den küçükse kargo ücreti ekle değilse ekleme
    totalPrice > 0 && totalPrice < 100
      ? (cargofee + Number(totalPrice)).toFixed(2)
      : Number(totalPrice.toFixed(2));
};

export {
  saveToLocalStorage,
  getFromLocalStorage,
  updateCartIcon,
  calculateCartTotal,
  renderCartTotal,
};
