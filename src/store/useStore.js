import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      logout: () => {
        localStorage.removeItem('token')
        set({ user: null, wishlist: [] })
      },

      wishlist: [],
      setWishlist: (newWishlist) => set({ wishlist: newWishlist }),
      toggleWishlist: (productId) =>
        set((state) => {
          const currentWishlist = Array.isArray(state.wishlist)
            ? state.wishlist
            : []
          const exists = currentWishlist.includes(productId)
          return {
            wishlist: exists
              ? currentWishlist.filter((id) => id !== productId)
              : [...currentWishlist, productId]
          }
        }),

      products: [],
      setProducts: (newProducts) => set({ products: newProducts }),

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
      clearComparison: () => set({ comparison: [] }),

      menuOpen: false,
      setMenuOpen: (value) => set({ menuOpen: value }),
      toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen }))
    }),
    {
      name: 'app-store',
      getStorage: () => localStorage,
      partialize: (state) => ({
        user: state.user,
        wishlist: state.wishlist
      })
    }
  )
)

export default useStore
