// src/components/HomeFilters/HomeFiltersWrapper.tsx
import { MantineProvider } from "@mantine/core";
import HomeFilters from "../HomeFilters/HomeFilters";

import "@mantine/core/styles.css";
import HomeProducts from "../HomeProducts/HomeProducts";
export default function HomeWrapper() {
  return (
    <MantineProvider >
      <HomeFilters />
      <HomeProducts/>
    </MantineProvider>
  );
}
