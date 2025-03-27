import Card from "./Card";
import Link from "next/link";
import { CampgroundItem } from "interface";

export default async function CampgroundCatalog({
  campgroundJson,
}: {
  campgroundJson: any;
}) {
  
  const campgroundJsonReady = await campgroundJson;

  return (
    <div className="flex flex-wrap justify-center gap-8 py-8">
      {campgroundJsonReady.data.map((campgroundItem: CampgroundItem) => (
        <Link
          href={`/campground/${campgroundItem._id}`}
          key={campgroundItem._id}
          className="w-64"
        >
          <Card
            campgroundName={campgroundItem.name}
            imgSrc={campgroundItem.picture}
            campgroundAddress={campgroundItem.address}
          />
        </Link>
      ))}
    </div>
  );
}
