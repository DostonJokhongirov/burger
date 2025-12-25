const basketBtns = document.querySelectorAll(".intro__basket"),
    introBurger = document.querySelector(".intro__burger"),
    introCards = document.querySelectorAll(".intro__card"),
    basketBox = document.querySelector(".basket__box"),
    shopBadge = document.querySelector(".nav__badge"),
    shop_totalPrice = document.querySelector(".basket__totalPrice"),
    body = document.querySelector("body");

const products = {
    crazy: {
        id: 1,
        img: "./images/crazy.png",
        name: "Crazy",
        price: 31000,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
    },
    light: {
        id: 2,
        img: "./images/light.png",
        name: "Light",
        price: 26000,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
    },
    cheeseBurger: {
        id: 3,
        img: "./images/cheeseBurger.png",
        name: "cheeseBurger",
        price: 29000,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
    },
    dBurger: {
        id: 4,
        img: "./images/dburger.png",
        name: "dBurger",
        price: 26000,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
    },
};

basketBtns.forEach((basket) => {
    basket.addEventListener("click", () => {
        const parent = basket.closest(".intro__card"),
            parentId = parent.getAttribute("id");
        products[parentId].amount++;

        productInfo();
    });
});

function productInfo() {
    const productsArr = [];

    for (const key in products) {
        const pk = products[key];
        const cardBadge = document.querySelector(`#${key} .card__badge`);

        if (pk.amount) {
            productsArr.unshift(pk);
            cardBadge.classList.add("active");
            cardBadge.innerHTML = pk.amount;
        } else {
            cardBadge.classList.remove("active");
        }
    }

    if (productsArr.length) {
        shopBadge.classList.add("nav__badge--active");
        shopBadge.innerHTML = productsArr.length;
    } else {
        shopBadge.classList.remove("nav__badge--active");
    }

    basketBox.innerHTML = "";
    let totalPrice = 0;
    for (let i = 0; i < productsArr.length; i++) {
        basketBox.innerHTML += basketInfo(productsArr[i]);
        totalPrice += productsArr[i].Summ;
    }
    shop_totalPrice.innerHTML = `${totalPrice / 1000} 000 сум`;
}

introCards.forEach((card) => {
    card.addEventListener("click", () => {
        const cardImg = card.querySelector(".intro__cardImg"),
            imgSrc = cardImg.getAttribute("src");
        introBurger.setAttribute("src", imgSrc);
    });
});

const basket = document.querySelector(".basket"),
    shop = document.querySelector(".nav__basket"),
    shopClose = document.querySelector(".basket__close");

shop.onclick = () => {
    basket.classList.add("active")
    body.classList.add("lock");
};
shopClose.onclick = () => {
    basket.classList.remove("active")
    body.classList.remove("lock");
};

function basketInfo(product) {
    const { id, img, name, Summ, amount } = product;
    return `
        <div class="basket__card">
            <div class="basket__info">
                <img src="${img}" alt="" />
                <div class="basket__prices">
                    <h3 class="basket__infoTitle">${name}</h3>
                    <p class="basket__price">${Summ / 1000} 000 сум</p>
                </div>
            </div>
            <div class="basket__amount">
                <button class="basket__minus" onclick="delProduct(${id})">-</button>
                <p class="basket__num">${amount}</p>
                <button class="basket__plus" onclick="addProduct(${id})">+</button>
            </div>
        </div>
    `;
}

function addProduct(id) {
    for (const key in products) {
        const pk = products[key];
        if (pk.id == id) {
            pk.amount++;
        }
    }
    productInfo();
}

function delProduct(id) {
    for (const key in products) {
        const pk = products[key];
        if (pk.id == id) {
            pk.amount--;
        }
    }
    productInfo();
}