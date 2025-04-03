import { Icons } from "@/assets/icons";
import { formatCurrency, formatToPercentage } from "../utils";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

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
    cell: (prop) => prop.row.index + 1,
  },
  {
    accessorKey: "symbol",
    header: "Name",
    cell: ({ row }) => {
      const symbol = row.getValue("symbol");

      const { name, icon } = SYMBOL_DETAILS[symbol];
      return (
        <div className="flex items-center gap-2">
          {icon}
          <div className="grid">
            <span className="font-semibold">{name}</span>
            <span className="text-xs">{symbol}</span>
          </div>
        </div>
      );
    },
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
      return <span data-price={price}>{formatCurrency(price)}</span>;
    },
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
      return <span>{formatCurrency(weightedAvgPrice)}</span>;
    },
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
      return <span>{formatToPercentage(priceChangePercent)}</span>;
    },
  },
];
