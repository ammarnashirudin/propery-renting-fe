import Link from "next/link";
import {Button} from "../ui/button";

export default function PropertyCard({ property }: { property: any }) {
  return (
    <div className="rounded-xl border bg-white shadow">
      <img
        src={property.image}
        className="h-40 w-full object-cover rounded-t-xl"
      />

      <div className="p-4 space-y-2">
        <h3 className="font-semibold">{property.name}</h3>

        <p className="text-sm text-gray-500">
          {property.category?.name}
        </p>

        {property.lowestPrice ? (
          <p className="font-bold text-blue-600">
            IDR {property.lowestPrice.toLocaleString()}
          </p>
        ) : (
          <p className="text-sm text-red-500">
            Tidak tersedia
          </p>
        )}

        <Button
          asChild
          className="block text-center"
        >
          <Link href={`/Property/${property.id}`}>
            View Detail
          </Link>
        </Button>
      </div>
    </div>
  );
}
