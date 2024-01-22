const authService = {
    isAuthenticated: () => {
  
      const token = localStorage.getItem('token')
  
      if (!token) {
        return false
      }
  
      return true
    },

    signOut: () => {
        localStorage.removeItem('token')
    }
  }
  
  export default authService