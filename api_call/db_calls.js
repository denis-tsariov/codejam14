import axios from "axios";

const BASE_URL2 = 'http://127.0.0.1:8000';
const BASE_URL = 'http://10.0.2.2:8000';

// Generic function for handling GET requests
const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Generic function for handling POST requests
const postData = async (endpoint, data) => {
  const header = {
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.post(`${BASE_URL}/${endpoint}`, data, header);
    console.log("resp.data", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Generic function for handling PUT requests
const updateData = async (endpoint, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Generic function for handling DELETE requests
const deleteData = async (endpoint) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Error handler
const handleError = (error) => {
  if (error.response) {
    console.error("Server Error:", error.response.data);
  } else if (error.request) {
    console.error("Network Error:", error.request);
  } else {
    console.error("Error:", error.message);
  }
  throw error; // Re-throw the error to be handled by the calling function if needed
};

//functions to interact with the API specific to app
// get a list of restaurants
export const getRestaurants = async () => {
  return await fetchData("restaurants");
};
//get a list of 100 restaurants with pagination
export const getRestaurantsWithPagination = async (page) => {
  return await fetchData(`restaurants?page=${page}`);
};
//get a single restaurant by ID
export const getRestaurantById = async (id) => {
  return await fetchData(`restaurants/${id}`);
};
// get the food_array of a restaurant
export const getRestaurantFoodImages = async (id) => {
  return await fetchData(`restaurants/food_array/${id}`);
};

// add a new record to the map table
export const addMapRecord = async (data) => {
  console.log("function", data);
  return await postData("maps", data);
};

// update an existing record in the map table
export const updateMapRecord = async (data) => {
  return await updateData("maps", data);
};

// delete a record from the map table
export const deleteMapRecord = async (id) => {
  return await deleteData(`maps/${id}`);
};

// Function to get common restaurants for two users
export const getCommonRestaurants = async (user1_id, user2_id) => {
  try {
    const response = await axios.get(`${BASE_URL}/maps/common_restaurants/`, {
      params: { user1_id, user2_id },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching common restaurants:", error);
    throw error;
  }
};

//get the list of friends of a user
export const getFriends = async (user1_id) => {
  try {
    const response = await axios.get(`${BASE_URL}/getFriends/`, {
      params: { user1_id}
    })
    return response.data
  } catch(error) {
      console.error("Error fetching Friends", error);
      throw error;
  }
}

// function to get a list of restaurants for a certain user from the maps table
export const getRestaurantsForUser = async (user_id) => {
  try {
    console.log(`${BASE_URL}/maps/user_maps/?user_id=${user_id}`);
    const response = await axios.get(
      `${BASE_URL}/maps/user_maps/?user_id=${user_id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants for user:", error);
    throw error;
  }
};

// function to return the list of users
export const getUsers = async () => {
  return await fetchData("user");
};

// function to search for a user by username
export const getUserByUsername = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/search/`, {
      params: { username },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user by username:", error);
    throw error;
  }
};

export const createMapRecord = async (data) => {
  return await postData("maps/add_resto_to_map", data);
}

// export all functions as a module
export default {
    getRestaurants,
    getRestaurantsWithPagination,
    getRestaurantById,
    getRestaurantFoodImages,
    addMapRecord, 
    updateMapRecord,
    deleteMapRecord, 
    getCommonRestaurants, 
    getRestaurantsForUser, 
    getUsers, 
    getUserByUsername,
    getFriends, 
    createMapRecord
  };


/*
functions we need:
- get a list of restaurants: json files with all the info of the restaurants (name, cost, food_array, etc)
- add a map record: add a new record to the map table with a given user_id and restaurant_id
- get a list of map record for a certain user: get all the records in the map table for a given user_id
*/
