
var app = new Vue({ //ne
    el: '#app',
    data: {
        brand: "Vue Mastery",
        product: 'Socks',
        link: 'https://google.com',
        selectedVariant: 0,
        inStock: false,
        details: ["75% Cotton", "50% Polyesterk", "Unisex"],
        inventory:0,
        variants: [
            {
                variantId: 1,
                variantColor: "green",
                variantImage: "./assets/vmSocks.jpeg",
                variantQuantity: 10

            },
            {
                variantId: 2,
                variantColor: "blue",
                variantImage: "./assets/blueSock.jpeg",
                variantQuantity: 10

            }
        ],
        cart: 10,
    },
    methods: {
        addToCart() {
            this.cart += 1

        },
        updateSock(image) {
           this.image = image
        },
        subtractFromCart() {
            this.cart -= 1
        },
        updatedProduct(index) {
            console.log(index)
            return this.selectedVariant = index

        }
    },
    computed: { 
        title() {
            return this.brand + " " + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        }
        
    }
})