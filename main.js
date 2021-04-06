
var app = new Vue({ //ne
    el: '#app',
    data: {
        product: 'Socks',
        description: 'Socks are a fluffy piece of clothe that covers the feet',
        image: './vmSocks.jpeg',
        link: 'https://google.com',
        inStock: false,
        inventory:0,
        sizes: [
            {
                size: "Small",
                id: "s"

            }, {
                size: "Medium",
                id: 'm'
            },
            {
                size: "Large",
                id: "l"
            }
        ],
        socks: [
            {
                id: 1,
                color: "green",
                image: "./vmSocks.jpeg"
            },
            {
                id: 2,
                color: "blue",
                image: "./blueSock.jpeg"
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
        }
    }
})