// Save user session (called after successful login)
export const loginUser = (email) => {
  sessionStorage.setItem("ticketapp_session", JSON.stringify({ email }));
};

// Remove session on logout
export const logoutUser = () => {
  sessionStorage.removeItem("ticketapp_session");
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const session = sessionStorage.getItem("ticketapp_session");
  return session !== null;
};


// Get session details (optional helper)
export const getUserSession = () => {
  const session = sessionStorage.getItem("ticketapp_session");
  return session ? JSON.parse(session) : null;
};