const BASE_URL = '/api'

export const fetchMangaList = async (params = '') => {
  const response = await fetch(`${BASE_URL}/manga?${params}`)
  if (!response.ok) throw new Error('Error fetching manga list')
  return await response.json()
}

export const fetchMangaDetails = async (mangaId) => {
  const response = await fetch(`${BASE_URL}/manga/${mangaId}`)
  if (!response.ok) throw new Error('Error fetching manga details')
  return await response.json()
}

export const fetchCoverArt = async (mangaId) => {
  const response = await fetch(`${BASE_URL}/cover?manga[]=${mangaId}`)
  if (!response.ok) throw new Error('Error fetching cover art')
  return await response.json()
}

export const fetchChapters = async (mangaId, params = '') => {
  const response = await fetch(`${BASE_URL}/manga/${mangaId}/feed?${params}`)
  if (!response.ok) throw new Error('Error fetching chapters')
  return await response.json()
}