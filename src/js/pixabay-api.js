
import axios from "axios";

const loader = document.querySelector('.loader');

const API_KEY = "49108908-dee8565c8232193f8d4c70c7a";
const BASE_URL = "https://pixabay.com/api/";

function showLoader() {
  loader.style.display = 'inline-block';
}

function hideLoader() {
  loader.style.display = 'none';  
}

export async function fetchImages(query, page = 1) {
  showLoader();

  const params = {
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page, 
    per_page: 40, 
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Помилка під час запиту:", error);
    return { hits: [], totalHits: 0 }; 
  } finally {
    hideLoader();
  }
}