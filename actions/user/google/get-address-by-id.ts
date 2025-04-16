"use server"

export async function getAddressByPlaceId(placeId: string) {

  if (!placeId) return null;

  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if(!apiKey) throw new Error("api-key is missing!")

    const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`);
    
    if (!response.ok) {
        throw new Error("Error in fetching google api");
      }
  
    const data = await response.json();
    
    const address = {
      address: data.result.formatted_address,
      location: data.result.geometry.location, 
      fullResult: data.result 
    };

    return address;
  } catch (error) {
    return console.error("Error in getAddressByPlaceId: ", error);
  }
}
