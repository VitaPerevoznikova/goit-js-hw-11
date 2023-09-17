import axios from "axios";

// export async function fetchImages(name) {
//   try {
//     let page = 1;
//     let limit = 40;

//     const params = new URLSearchParams({
//       page: page,
//       per_page: limit,
//     });

//     const url = `https://pixabay.com/api/?key=39403201-abd58df21a454f128cd9be12a&q=${name}&${params}&image_type=photo&orientation=horizontal&safesearch=true`;

//     const response = await axios.get(url);
//     const responseFormat = await response.data;
//     page += 1;
//     return responseFormat;
//   } catch (error) {
//       console.error(error);
//     }
// }

const URL = "https://pixabay.com/api/";
const KEY = '39403201-abd58df21a454f128cd9be12a';

export async function fetchGallery(q, page, perPage) {
  const url = `${URL}?key=${KEY}&q=${q}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`;
  const response = await axios.get(url);
  return response.data;
};