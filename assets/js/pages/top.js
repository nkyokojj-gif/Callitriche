
const swiper = new Swiper('.swiper', {
  // Optional parameters
  loop: true,
  centeredSlides: true,
  slidesPerView: 1.4,
  spaceBetween: 20,
  loopedSlides: 3,
  autoplay: {
    delay:6000
  },
  pagination: {
    el: '.swiper-pagination',
  },
  navigation:{
    nextEl:'.swiper-button-next',
    prevEl:'.swiper-button-prev',
  },
});


        // -----------------------------------
        // 1. HTML要素を取得する
        // -----------------------------------
        // const productIdSpan = document.getElementById("productId");
        // const productNameSpan = document.getElementById("productName");
        // const priceSpan = document.getElementById("price");
        // const quantityInput = document.getElementById("quantity");
        const buyButtons = document.querySelectorAll(".productImage");
        const result = document.getElementById("result");

        // -----------------------------------
        // 2. localStorage に保存するときのキー名
        // -----------------------------------
        const STORAGE_KEY = "goodsOrder";

        // -----------------------------------
        // 3. JSONから読み込んだ商品情報を入れておく変数(ここまではやる)
        // -----------------------------------
        let productDataFromJson = null;

        // -----------------------------------
        // 4. JSONファイルを読み込む（丸コピー）
        // -----------------------------------
        // goods.json を fetch で取得します
        fetch("assets/data/goods.json")
            .then(function (response) {
                // ファイルの取得に失敗した場合
                if (!response.ok) {
                    throw new Error("JSONファイルの読み込みに失敗しました");
                }

                // JSON形式として読み込む
                return response.json();
            })
            .then(function (products) {
                // 今回は1件目の商品を使う
                // const product = products[0,1];

                // 読み込んだ商品情報を変数に保存しておく
                productDataFromJson = products;

                // 画面に商品情報を表示する
                // productIdSpan.textContent = product.productId;
                // productNameSpan.textContent = product.productName;
                // priceSpan.textContent = product.price;
            })
            .catch(function (error) {
                console.error(error);
                result.textContent = "商品情報の読み込みに失敗しました";
            });

        // -----------------------------------
        // 5. 購入ボタンが押されたときの処理
        // -----------------------------------
        buyButtons.forEach(button => {
            button.addEventListener("click", function () {
                // JSONの読み込みがまだ終わっていない場合
                if (!productDataFromJson) {
                    result.textContent = "商品情報をまだ読み込み中です";
                    return;
                }

            // 入力された個数を取得する
            // const quantity = quantityInput.value;

            // -----------------------------------
            // 6. 入力チェック
            // -----------------------------------
            // if (quantity === "" || Number(quantity) <= 0) {
                // result.textContent = "1以上の個数を入力してください";
                // return;
            // }

            const index = this.getAttribute("data-index");
            const selectedProduct = productDataFromJson[index];

            // -----------------------------------
            // 7. localStorage に保存するデータを作る
            // -----------------------------------
            const goodsOrder = {
                productId: selectedProduct.productId,
                productName: selectedProduct.productName,
                price: selectedProduct.price,
                image: selectedProduct.image,
                quantity: 1
            };

            // -----------------------------------
            // 8. localStorage に保存する
            // -----------------------------------
            localStorage.setItem(STORAGE_KEY, JSON.stringify(goodsOrder));

            // 保存できたことを画面に表示
            result.textContent = "保存しました: " + JSON.stringify(goodsOrder);

            // -----------------------------------
            // 9. カート画面へ移動する
            // -----------------------------------
            window.location.href = "cart.html";
            });
        });



const mainVisual = document.querySelector(".main-visual");
const overlay = document.querySelector(".overlay");
const mainText = document.querySelector(".main-text");
const subText = document.querySelector(".sub-text");


window.addEventListener("scroll", function() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const overlay = document.querySelector(".overlay");
    const catchcopy = document.querySelector(".catchcopy");
    const mainText = document.querySelector(".main-text");
    const subText = document.querySelector(".sub-text");

    // 1. 背景を暗くする（0から0.7）
    let bgOpacity = scrollY / (windowHeight * 0.8);
    if (bgOpacity > 0.7) bgOpacity = 0.7;
    overlay.style.opacity = bgOpacity;

    // 2. 【追加】最初の英語（catchcopy）を消していく
    // スクロール開始から300px地点で完全に消える設定
    let catchOpacity = 1 - (scrollY / 300);
    if (catchOpacity < 0) catchOpacity = 0;
    catchcopy.style.opacity = catchOpacity;

    // 2. 文字全体の透明度をスクロールに合わせて上げる
    // 最初（scrollY=0）は透明、300pxくらいスクロールしたらハッキリ見えるように
    let textOpacity = (scrollY - 200) / 300;
    if (textOpacity < 0) textOpacity = 0;
    if (textOpacity > 1) textOpacity = 1;
    mainText.style.opacity = textOpacity;
    subText.style.opacity = textOpacity;
});


document.querySelectorAll('.component__summary').forEach((summary) => {
    summary.addEventListener('click', (e) => {
        e.preventDefault(); // ブラウザのデフォルト動作（パッと開く）を止める

        const parent = summary.parentElement; // .component__details

        // すでに開いている場合は閉じる、閉じている場合は開く
        if (parent.hasAttribute('open')) {
            parent.classList.remove('is-open');
            // アニメーションが終わるのを待ってから open 属性を消す
            setTimeout(() => { parent.removeAttribute('open'); }, 300);
        } else {
            parent.setAttribute('open', '');
            // 属性をつけた直後にクラスをつけることでアニメーションを発火させる
            requestAnimationFrame(() => {
                parent.classList.add('is-open');
            });
        }
    });
});

window.addEventListener("scroll", function() {
    const header = document.querySelector(".header");
    // 100px以上スクロールしたら 'is-scrolled' クラスを付与
    if (window.scrollY > 100) {
        header.classList.add("is-scrolled");
    } else {
        header.classList.remove("is-scrolled");
    }
});