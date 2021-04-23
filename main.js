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
            </div>

            <product-tabs :reviews="reviews"></product-tabs>       

        </div>`,
    data() {
        return {
            brand: "Vue Mastery",
            product: 'Socks',
            link: 'https://google.com',
            selectedVariant: 0,
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
                    variantQuantity: 10

                }
            ],
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)

        },
        updateSock(image) {
            this.image = image
        },
        subtractFromCart() {
            this.cart -= 1
        },
        updatedProduct(index) {
            this.selectedVariant = index

        },
        addReview(productReview) {
            this.reviews.push(productReview)
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

Vue.component('product-review', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">

        <p v-if="errors.length">
        <b>Please Correct the following error(s):</b>
        <ul>
            <li v-for="error in errors">{{error}}</li>
        </ul>
        </p>
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>

      <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
      </p>

      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
         <p>Would you recommend this product?</p>
         <label for="positive">Yes</label>
         <input  v-model="answer" type="radio" id="positive" name="answer" value="positive">
         <label for="negative">No</label>
         <input v-model="answer" type="radio" id="negative" name="answer" value="negative">
         <br>
      <p>
        <input type="submit" value="Submit">
      </p>
    </form>
        `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            answer: null,
            errors: []

        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating && this.answer) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    answer: this.answer,
                }
                this.$emit('review-submitted', productReview)
                this.name = null,
                this.review = null,
                this.rating = null,
                this.answer = null,
                this.errors = []
                                
            }
            else {
                if(!this.name) this.errors.push("Name required")
                if(!this.review) this.errors.push("Review required")
                if (!this.rating) this.errors.push("Rating required")
                if(!this.answer) this.errors.push("Yes or No answer required")
            }
            

        }
    }
})

Vue.component("product-tabs", {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
    <div>
        <span class="tab"
        :class="{ activeTab: selectedTab === tab}"
        v-for="(tab, index) in tabs"
        :key="index"
        @click="selectedTab = tab">{{ tab }}</span>
  
        <div v-show="selectedTab === 'Reviews'">
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul>
            <li v-for="review in reviews">
            <p>{{review.name}}</p>
            <p>Rating: {{review.rating}}</p>
            <p>{{review.review}}</p>
            </li>
            </ul>
        </div>

       <product-review
        v-show="selectedTab === 'Make a Review'">
       </product-review>
    
   </div>
    `,
    data() {
        return {
            tabs: ["Reviews", "Make a Review"],
            selectedTab: "Reviews"
        }
    }
})

var app = new Vue({ //ne
    el: '#app',
    data: {
        premium: true,
        cart: []

    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        }
    }

})

