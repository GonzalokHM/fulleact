import { create } from 'zustand'

const useStore = create((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),

  products: [],
  setProducts: (newProducts) => set({ products: newProducts }),

  wishlist: [],
  toggleWishlist: (productId) =>
    set((state) => {
      const exists = state.wishlist.includes(productId)
      return {
        wishlist: exists
          ? state.wishlist.filter((id) => id !== productId)
          : [...state.wishlist, productId]
      }
    }),

  comparison: [],
  addComparison: (productId) =>
    set((state) => {
      if (state.comparison.includes(productId)) return state
      if (state.comparison.length >= 4) {
        alert('Solo puedes comparar hasta 4 productos.')
        return state
      }
      return { comparison: [...state.comparison, productId] }
    }),
  removeComparison: (productId) =>
    set((state) => ({
      comparison: state.comparison.filter((id) => id !== productId)
    })),
  clearComparison: () => set({ comparison: [] })
}))

export default useStore
