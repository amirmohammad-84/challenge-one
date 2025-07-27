const AUTH_TOKEN = 'a85d08400c622b50b18b61e239b9903645297196';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Token ${AUTH_TOKEN}`,
};

export const transcribeMedia = async (mediaUrl: string) => {
  const res = await fetch(`/api/transcribe_files/`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ media_urls: [mediaUrl] }),
  });
  return res.json();
};

export const listRequests = async (query?: string) => {
  const url = `/api/requests/${query ? `?${query}` : ''}`;
  const res = await fetch(url, {
    method: 'GET',
    
    headers,
  });
  return res.json();
};


export const getMediaImage = async (mediaUrl: string) => {
  const encodedUrl = encodeURIComponent(mediaUrl);
  const res = await fetch(`/media_image/${encodedUrl}`, {
    method: 'GET',
    headers: {
      ...headers,
      Authorization: 'Token d6e0206d421c91200d2753c24892bb95d365e74c', // متفاوت بود
    },
  });
  return res.blob();
};

export const searchQuery = async (query: string) => {
  const res = await fetch(`/api/search/`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query }),
  });
  return res.json();
};

export const getRequestDetail = async (id: number) => {
  const res = await fetch(`/api/requests/${id}/`, {
    method: 'GET',
    headers,
  });
  return res.json();
};

export const deleteRequest = async (id: number) => {
  const res = await fetch(`/api/requests/${id}/`, {
    method: 'DELETE',
    headers,
  });
  return res;
};