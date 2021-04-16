Vue.component("product", {
    props: {
        premium: {
            type: Boolean,
            required: true

        }
    },
    template: `
     <div class="product">
            <div class="product-image">
                <img v-bind:src="image">
            </div>

            <div class="product-info">
                <h1>{{title}}</h1>
                <p v-if='inStock > 5'>In Stock</p>
                <p v-else-if='inStock <= 5 && inStock > 0 '>Almost Sold
                    Out</p>
                <p v-else='inStock'
                :class="{ outStock: !inStock}"
                >Out of Stock</p>
                <p>Shipping: {{ shipping }}</p>

                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>

                <div
                     v-for="(variant, index ) in variants"
                     :key="variant.variantId"
                     class="color-box"
                     @mouseover="updatedProduct(index)"
                    :style="{ backgroundColor: variant.variantColor}"
                    >
                </div>

                <button
                v-on:click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock}"
                >
                Add to Cart
                </button>
                <!-- <button v-on:click="subtractFromCart">Move from Cart</button> -->

                <div class="cart">
                    <p>Cart({{inStock }})</p>
                </div>

                <p
                v-if="!onSale"
                >{{printOnSale}}</p>



            </div>
        </div>`,
    data() {
        return {
            brand: "Vue Mastery",
            product: 'Socks',
            link: 'https://google.com',
            selectedVariant: 0,
            cart: 10,
            onSale: false,
            details: ["75% Cotton", "50% Polyesterk", "Unisex"],
            variants: [
                {
                    variantId: 1,
                    variantColor: "green",
                    variantImage: "./assets/vmSocks.jpeg",
                    variantQuantity: 10,
                    variantCart: 0
                },
                {
                    variantId: 2,
                    variantColor: "blue",
                    variantImage: "./assets/blueSock.jpeg",
                    variantQuantity: 0

                }
            ],
        }
    },
    methods: {
        addToCart() {
            this.variants[this.selectedVariant].variantCart += 1

        },
        updateSock(image) {
            this.image = image
        },
        subtractFromCart() {
            this.cart -= 1
        },
        updatedProduct(index) {
            this.selectedVariant = index

        }
    },
    computed: {
        title() {
            return this.brand + " " + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        printOnSale() {
            return this.brand + " " + this.product
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        }

    }
})

var app = new Vue({ //ne
    el: '#app',
    data: {
        premium: true
    }

})