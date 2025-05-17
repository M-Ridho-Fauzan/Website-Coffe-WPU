// Alpine.data is a function that registers a component with Alpine.js
// import Alpine from "alpinejs";
// import dropdown from './dropdown.js'
// import collapse from './collapse.js'
// import modal from './modal.js'
// import tooltip from './tooltip.js'
// import popover from './popover.js'
// import tab from './tab.js'
// import toast from './toast.js'
// import carousel from './carousel.js'

document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    // dummy data
    items: Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
      img: `https://placehold.co/600x600/282828/FFFFFF/png?text=Product+${
        i + 1
      }&&font=Poppins`,
      price: [10000, 20000, 30000, 40000, 50000][i],
      quantity: Math.floor(Math.random() * 100) + 1,
    })),

    // items: [
    //   {
    //     id: 1,
    //     name: "Product 1",
    //     img: "https://placehold.co/600x600/282828/FFFFFF/png?text=Product+1&&font=Poppins",
    //     price: 10999.0,
    //     quantity: 1,
    //   },
    //   {
    //     id: 2,
    //     name: "Product 2",
    //     img: "https://placehold.co/600x600/282828/FFFFFF/png?text=Product+2&&font=Poppins",
    //     price: 29999.0,
    //     quantity: 1,
    //   },
    //   {
    //     id: 3,
    //     name: "Product 3",
    //     img: "https://placehold.co/600x600/282828/FFFFFF/png?text=Product+3&&font=Poppins",
    //     price: 30000.0,
    //     quantity: 1,
    //   },
    //   {
    //     id: 4,
    //     name: "Product 4",
    //     img: "https://placehold.co/600x600/282828/FFFFFF/png?text=Product+4&&font=Poppins",
    //     price: 46000.0,
    //     quantity: 1,
    //   },
    //   {
    //     id: 5,
    //     name: "Product 5",
    //     img: "https://placehold.co/600x600/282828/FFFFFF/png?text=Product+5&&font=Poppins",
    //     price: 50000.0,
    //     quantity: 1,
    //   },
    // ],
  }));

  // cart
  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,

    addToCart(newItem) {
      // Ceck if item already in cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      if (!cartItem) {
        // If item not in cart, add it
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });

        // Update total price
        this.quantity++;
        this.total += newItem.price;
      } else {
        // If item already in cart, update quantity
        this.items = this.items.map((item) => {
          // Jika Barang Berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // Jika Barang sudah ada, tambah quantity dan total nya
            item.quantity++;
            item.total += item.price;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },

    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);

      // Jika item lebih dari satu
      if (cartItem.quantity > 1) {
        // telusuri 1 1
        this.items = this.items.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total -= item.price;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // Jika item hanya satu, hapus dari cart
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },

    clearCart() {
      // Clear the cart
      this.items = [];
      this.total = 0;
      this.quantity = 0;
    },
  });
});

// Convert price to rupiah
const formatRupiah = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

// Code From Chat GPT

// document.addEventListener("alpine:init", () => {
//   Alpine.data("store", () => ({
//     products: {
//       items: Array.from({ length: 5 }, (_, i) => ({
//         id: i + 1,
//         name: `Product ${i + 1}`,
//         img: `https://placehold.co/600x600/282828/FFFFFF/png?text=Product+${
//           i + 1
//         }&&font=Poppins`,
//         price: [10999, 29999, 30000, 46000, 50000][i],
//         quantity: Math.floor(Math.random() * 100) + 1,
//         desiredQty: 1,
//         // quantity yang akan ditambahkan ke cart
//       })),
//     },
//     cart: {
//       items: [],
//       total: 0,
//       totalPrice: 0,
//       addToCart(product, qty) {
//         if (product.quantity >= qty) {
//           const existing = this.items.find((i) => i.id === product.id);
//           if (existing) {
//             existing.quantity += qty;
//           } else {
//             this.items.push({
//               id: product.id,
//               name: product.name,
//               price: product.price,
//               quantity: qty,
//             });
//           }
//           product.quantity -= qty;
//           product.desiredQty = 1;
//           this.calculateTotal();
//         }
//       },
//       removeFromCart(item) {
//         const index = this.items.findIndex((i) => i.id === item.id);
//         if (index > -1) {
//           // balikin ke stock
//           const original = Alpine.store("store").products.items.find(
//             (p) => p.id === item.id
//           );
//           if (original) {
//             original.quantity += this.items[index].quantity;
//           }
//           this.items.splice(index, 1);
//           this.calculateTotal();
//         }
//       },
//       calculateTotal() {
//         this.total = this.items.reduce((sum, i) => sum + i.quantity, 0);
//         this.totalPrice = this.items.reduce(
//           (sum, i) => sum + i.quantity * i.price,
//           0
//         );
//       },
//     },
//   }));
// });
