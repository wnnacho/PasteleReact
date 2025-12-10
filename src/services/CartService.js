// src/services/CartService.js
export const CartService = {
  // Obtener carrito del localStorage
  getCart: () => {
    try {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    } catch {
      return [];
    }
  },

  // Guardar carrito en localStorage
  saveCart: (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  },

  // Agregar producto al carrito
  addToCart: (product, quantity = 1, personalization = '') => {
    const cart = CartService.getCart();
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex >= 0) {
      // Actualizar cantidad
      cart[existingItemIndex].quantity += quantity;
      if (personalization) {
        cart[existingItemIndex].personalization = personalization;
      }
    } else {
      // Agregar nuevo item
      cart.push({
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        imagen: product.imagen,
        cantidad: quantity,
        personalizable: product.personalizable,
        personalization: product.personalizable ? personalization : '',
        descripcion: product.descripcion
      });
    }

    CartService.saveCart(cart);
    return cart;
  },

  // Remover producto del carrito
  removeFromCart: (productId) => {
    const cart = CartService.getCart().filter(item => item.id !== productId);
    CartService.saveCart(cart);
    return cart;
  },

  // Actualizar cantidad
  updateQuantity: (productId, quantity) => {
    const cart = CartService.getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex >= 0) {
      if (quantity <= 0) {
        cart.splice(itemIndex, 1);
      } else {
        cart[itemIndex].cantidad = quantity;
      }
      CartService.saveCart(cart);
    }

    return cart;
  },

  // Vaciar carrito
  clearCart: () => {
    localStorage.removeItem('cart');
    return [];
  },

  // Calcular total
  calculateTotal: (cart) => {
    return cart.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }
};