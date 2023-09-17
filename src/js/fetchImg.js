import axios from "axios";

const URL = "https://pixabay.com/api/";
const KEY = '39403201-abd58df21a454f128cd9be12a';

export async function fetchGallery(q, page, perPage) {
  const url = `${URL}?key=${KEY}&q=${q}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`;
  const response = await axios.get(url);
  return response.data;
};