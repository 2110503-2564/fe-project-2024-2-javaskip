export default async function updateCampground(
  id: string,
  token: string,
  name: string,
  address: string,
  telephone: string,
  picture: string
) {
  let bodyData = {
    name: name,
    address: address,
    telephone: telephone,
    picture: picture,
  };
  console.log(bodyData);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/campgrounds/${id}`,
    {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    }
  );

  if (!response.ok) {
    throw new Error("Cannot fetch campground");
  }

  return await response.json();
}
