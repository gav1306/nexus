import { Icons } from "@/assets/icons";
import { formatCurrency, formatToPercentage } from "../utils";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFavoriteCryptoStore } from "../store";

const SYMBOL_DETAILS = {
  BTCUSDT: {
    name: "Bitcoin",
    icon: <Icons.Bitcoin width={32} height={32} />,
  },
  ETHUSDT: {
    name: "Ethereum",
    icon: <Icons.Ethereum width={32} height={32} />,
  },
  BNBUSDT: {
    name: "BNB",
    icon: <Icons.Binance width={32} height={32} />,
  },
  DOGEUSDT: {
    name: "Dogecoin",
    icon: <Icons.DogeCoin width={32} height={32} />,
  },
  PAXGUSDT: {
    name: "PAX Gold",
    icon: <Icons.Paxos width={32} height={32} />,
  },
};

export const cryptoListColumns = [
  {
    accessorKey: "",
    header: "Sr.No",
    cell: (prop) => (
      <span className="text-center block">{prop.row.index + 1}</span>
    ),
    size: 50,
  },
  {
    accessorKey: "symbol",
    header: "Name",
    cell: ({ row }) => {
      const symbol = row.getValue("symbol");

      const { name, icon } = SYMBOL_DETAILS[symbol];
      return (
        <div className="flex items-center gap-2 justify-center">
          {icon}
          <div className="grid">
            <span className="font-semibold">{name}</span>
            <span className="text-xs">{symbol}</span>
          </div>
        </div>
      );
    },
    size: 300,
  },
  {
    accessorKey: "lastPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown />
        </Button>
      );
    },
    enableSorting: true,
    cell: ({ row }) => {
      const price = row.getValue("lastPrice");
      return (
        <span className="text-center block" data-price={price}>
          {formatCurrency(price)}
        </span>
      );
    },
    size: 300,
  },
  {
    accessorKey: "weightedAvgPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          VWAP (24Hr)
          <ArrowUpDown />
        </Button>
      );
    },
    enableSorting: true,
    cell: ({ row }) => {
      const weightedAvgPrice = row.getValue("weightedAvgPrice");
      return (
        <span className="text-center block">
          {formatCurrency(weightedAvgPrice)}
        </span>
      );
    },
    size: 100,
  },
  {
    accessorKey: "priceChangePercent",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Change (24Hr)
          <ArrowUpDown />
        </Button>
      );
    },
    enableSorting: true,
    cell: ({ row }) => {
      const priceChangePercent = row.getValue("priceChangePercent");
      return (
        <span className="text-center block">
          {formatToPercentage(priceChangePercent)}
        </span>
      );
    },
    size: 100,
  },
  {
    accessorKey: "quoteVolume",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Traded (24Hr)
          <ArrowUpDown />
        </Button>
      );
    },
    enableSorting: true,
    cell: ({ row }) => {
      const quoteVolume = row.getValue("quoteVolume");
      return (
        <span className="text-center block">
          {formatCurrency(quoteVolume, { notation: "compact" })}
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
      const { symbol } = row.original;

      const { addToFavorites, favorites, removeFromFavorites } =
        useFavoriteCryptoStore();
      const isAddedToFavorites = favorites.includes(symbol);

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
                  onClick={removeFromFavorites.bind(null, symbol)}
                >
                  Remove from favorites
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={addToFavorites.bind(null, symbol)}>
                  Add to favorites
                </DropdownMenuItem>
              )}

              <DropdownMenuItem>View details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    size: 50,
  },
];
