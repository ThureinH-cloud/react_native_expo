import { API_URL } from "@/config";

export const fetchApi=async (
    endpoint:string,
    method="GET",
    token="Hay it's me baby.",
    data={}
)=>{
    const url = API_URL + endpoint;
    const headers = {
        accept: "application/json",
        Authorization: "Bearer " + token,
      };
      const options =
    Object.keys(data).length === 0
      ? {
          method,
          headers,
        }
      : {
          method,
          headers,
          body: JSON.stringify(data),
        };
       try {
     const res = await fetch(url, options);
     if (!res.ok) {
      throw new Error("Failed to fetch api");
     }
     const response = await res.json();
    return response;
   } catch (error) {
     console.error(error);
   }
        
}