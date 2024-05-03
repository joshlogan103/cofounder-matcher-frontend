import { api } from './apiConnection.js'

// User - API calls

export const getUsers = async () => {
  return await api.get('/users')
}

export const getUserById = async (id) => {
  return await api.get(`/users/${id}`)
}

export const createUser = async (payload) => {
  return await api.post('/users', payload)
}

export const updateUserById = async (id, payload) => {
  return await api.put(`/users/${id}`, payload)
}

export const deleteUserById = async (id) => {
  return await api.delete(`/users/${id}`)
}

// Auth - API calls

export const signup = async (payload) => {
  return await api.post(`/auth/signup`, payload)
}

export const login = async (payload) => {
  return await api.post(`/auth/login`, payload)
}

export const verifyLoggedIn = async () => {
  return await api.post(`/auth/verifyLoggedIn`)
}

// Conversations - API calls

export const getConversations = async () => {
  return await api.get('/conversations')
}

export const getConversationById = async (id) => {
  return await api.get(`/conversations/${id}`)
}

export const createConversation = async (payload) => {
  return await api.post('/conversations', payload)
}

export const updateConversationById = async (id, payload) => {
  return await api.put(`/conversations/${id}`, payload)
}

export const deleteConversationById = async (id) => {
  return await api.delete(`/conversations/${id}`)
}

// Messages - API calls

export const getMessages = async () => {
  return await api.get('/messages')
}

export const getMessageById = async (id) => {
  return await api.get(`/messages/${id}`)
}

export const createMessageAndCreateConversation = async (payload) => {
  return await api.post('/messages/new-conversation', payload)
}

export const createMessageAndUpdateConversation = async (conversationId, payload) => {
  return await api.post(`/messages/update-conversation/${conversationId}`, payload)
}

export const updateMessageById = async (id, payload) => {
  return await api.put(`/messages/${id}`, payload)
}

export const deleteMessageById = async (id) => {
  return await api.delete(`/messages/${id}`)
}

// Profile - API calls

export const getProfiles = async () => {
  return await api.get('/profiles')
}

export const getProfilesByQuery = async (filters) => {
  const queryParams = new URLSearchParams(filters).toString();
  console.log(queryParams)
  return await api.get(`/profiles/query?${queryParams}`);
}

export const getProfileById = async (id) => {
  return await api.get(`/profiles/${id}`)
}

export const createProfile = async (payload) => {
  return await api.post('/profiles/', payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const updateProfileByUserId = async (userId, payload) => {
  return await api.put(`/profiles/user-profile/${userId}`, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const updateProfileById = async (id, payload) => {
  return await api.put(`/profiles/${id}`, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const deleteProfileById = async (id) => {
  return await api.delete(`/profiles/${id}`)
}

// Schools - API calls

export const getSchools = async () => {
  return await api.get('/schools')
}

export const getSchoolById = async (id) => {
  return await api.get(`/schools/${id}`)
}

export const createSchool = async (payload) => {
  return await api.post('/schools/', payload)
}

export const updateSchoolById = async (id, payload) => {
  return await api.put(`/schools/${id}`, payload)
}

export const deleteSchoolById = async (id) => {
  return await api.delete(`/schools/${id}`)
}

// Favorites - API calls

export const getFavorites = async () => {
  return await api.get('/favorites')
}

export const getFavoriteById = async (id) => {
  return await api.get(`/favorites/${id}`)
}

export const getAllFavoritesByUserId = async (userId) => {
  return await api.get(`/favorites/my-favorites/${userId}`)
}

export const createFavorite = async (payload) => {
  return await api.post('/favorites/', payload)
}

export const updateFavoriteById = async (id, payload) => {
  return await api.put(`/favorites/${id}`, payload)
}

export const deleteFavoriteById = async (id) => {
  return await api.delete(`/favorites/${id}`)
}

// Profile Helpers - API Calss

export const getProgramTypes = async () => {
  return await api.get('/profile-list-vals/program-type')
}

export const getHasIdea = async () => {
  return await api.get('/profile-list-vals/has-idea')
}

export const getAreasOfResponsibility = async () => {
  return await api.get('/profile-list-vals/areas-of-responsibility')
}

export const getIndustryInterests = async () => {
  return await api.get('/profile-list-vals/industry-interests')
}