import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFavoriteWeatherStore } from "../store";
import { CITY_LIST, formatTime } from "../utils";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const weatherListColumns = [
  {
    accessorKey: "",
    id: crypto.randomUUID(),
    header: "Sr.No",
    cell: (prop) => (
      <span className="block text-center">{prop.row.index + 1}</span>
    ),
    size: 50,
  },
  {
    accessorKey: "",
    id: crypto.randomUUID(),
    header: () => {
      return <span className="text-left block">Name</span>;
    },
    cell: ({ row }) => {
      const [_, city] = Object.entries(CITY_LIST).find(([_, city]) => {
        const { latitude, longitude } = city;
        const { latitude: rowLatitude, longitude: rowLongitude } = row.original;
        return latitude === rowLatitude && longitude === rowLongitude;
      });

      const { name } = city;

      return <span className="font-semibold">{name}</span>;
    },
    size: 100,
  },
  {
    accessorKey: "",
    id: crypto.randomUUID(),
    header: "🌡 Temperature",
    cell: ({ row }) => {
      const { temperature_2m } = row.original.current;
      return <span className="block text-center">{temperature_2m}°C</span>;
    },
    size: 100,
  },
  {
    accessorKey: "",
    id: crypto.randomUUID(),
    header: "🏖 Feels Like",
    cell: ({ row }) => {
      const { apparent_temperature } = row.original.current;
      return (
        <span className="block text-center">{apparent_temperature}°C</span>
      );
    },
    size: 100,
  },
  {
    accessorKey: "",
    id: crypto.randomUUID(),
    header: "💧 Humidity",
    cell: ({ row }) => {
      const { relative_humidity_2m } = row.original.current;
      return <span className="block text-center">{relative_humidity_2m}%</span>;
    },
    size: 100,
  },
  {
    accessorKey: "",
    id: crypto.randomUUID(),
    header: "🌅 Sunrise",
    cell: ({ row }) => {
      const { sunrise } = row.original.daily;
      return (
        <span className="block text-center">
          {sunrise.length ? formatTime(sunrise[0]) : "NA"}
        </span>
      );
    },
    size: 100,
  },
  {
    accessorKey: "",
    id: crypto.randomUUID(),
    header: "🌇 Sunset",
    cell: ({ row }) => {
      const { sunset } = row.original.daily;
      return (
        <span className="block text-center">
          {sunset.length ? formatTime(sunset[0]) : "NA"}
        </span>
      );
    },
    size: 100,
  },
  {
    accessorKey: "",
    id: crypto.randomUUID(),
    header: "📉 Min Temp",
    cell: ({ row }) => {
      const { temperature_2m_min } = row.original.daily;
      return (
        <span className="block text-center">
          {temperature_2m_min.length ? `${temperature_2m_min[0]}°C` : "NA"}
        </span>
      );
    },
    size: 100,
  },

  {
    accessorKey: "",
    id: crypto.randomUUID(),
    header: "📈 Max Temp",
    cell: ({ row }) => {
      const { temperature_2m_max } = row.original.daily;
      return (
        <span className="block text-center">
          {temperature_2m_max.length ? `${temperature_2m_max[0]}°C` : "NA"}
        </span>
      );
    },
    size: 100,
  },

  {
    accessorKey: "",
    header: "",
    id: crypto.randomUUID(),
    cell: ({ row }) => {
      const { addToFavorites, favorites, removeFromFavorites } =
        useFavoriteWeatherStore();

      const [city] = Object.entries(CITY_LIST).find(([_, city]) => {
        const { latitude, longitude } = city;
        const { latitude: rowLatitude, longitude: rowLongitude } = row.original;
        return latitude === rowLatitude && longitude === rowLongitude;
      });

      const isAddedToFavorites = favorites.includes(city);

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {isAddedToFavorites ? (
                <DropdownMenuItem
                  className="text-red-400"
                  onClick={removeFromFavorites.bind(null, city)}
                >
                  Remove from favorites
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={addToFavorites.bind(null, city)}>
                  Add to favorites
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <Link href={`/weather/${city}`}>View details</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    size: 50,
  },
];
