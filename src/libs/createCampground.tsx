export default async function createCampground(
  token: string,
  name: string,
  address: string,
  telephone: string,
  picture: string
) {
  let bodyData = {
    name: name,
    address: address,
    tel: telephone,
    picture: picture,
  };
  console.log("Request Body:", bodyData);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/campgrounds/`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    }
  );

  const responseData = await response.json();

  if (!response.ok) {

    alert(responseData.message);
    throw new Error(responseData.message || "Cannot create campground");
  }

  return responseData; 
}
