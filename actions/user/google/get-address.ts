'use server'

export async function getAddress(address: string) {
  if (!address) return null;

  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) throw new Error("Api-key is missing!");

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(address)}&components=country:de&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Error in fetching google api");
    }

    const data = await response.json();

    const cities = data.predictions.map((prediction: any) => ({
      name: prediction.description,
      placeId: prediction.place_id,
    }));

    return cities;
  } catch (error) {
    console.error("Error in getAddress: ", error);
    return null;
  }
}
