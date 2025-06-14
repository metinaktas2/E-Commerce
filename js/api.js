const fetchProducts = async () => {
  try {
    //api'ya istek at
    const response = await fetch("db.json");

    //api'dan gelen veriyi js.nesnesine çevir
    const data = await response.json();

    //products içerisindeki products verisini return et
    return data.products;
  } catch (error) {
    console.log(`Hata:${error}`);
    //hata varsa console'a çıktı ver ve geriye boş bir dizi döndür
    return [];
  }
};
export default fetchProducts;
