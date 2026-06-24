import {
  Building2, Store, Factory, Building, Trees, LayoutGrid, Container as ContainerIcon,
  Hotel, Caravan, Server, Landmark, Boxes, Warehouse, Percent, Repeat, LineChart, Scale,
  FileText, BarChart3, TrendingUp, Radar, Calculator, Search, FileBarChart, type LucideIcon,
} from "lucide-react";

/** Registry of icon names referenced from data files. */
const registry: Record<string, LucideIcon> = {
  Building2, Store, Factory, Building, Trees, LayoutGrid, Container: ContainerIcon,
  Hotel, Caravan, Server, Landmark, Boxes, Warehouse, Percent, Repeat, LineChart, Scale,
  FileText, BarChart3, TrendingUp, Radar, Calculator, Search, FileBarChart,
};

export function DataIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = registry[name] ?? Building2;
  return <Cmp className={className} aria-hidden />;
}
