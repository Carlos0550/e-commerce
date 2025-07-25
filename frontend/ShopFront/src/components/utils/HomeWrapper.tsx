// src/components/HomeFilters/HomeFiltersWrapper.tsx
import { MantineProvider } from "@mantine/core";
import HomeFilters from "../HomeFilters/HomeFilters";

import "@mantine/core/styles.css";
import HomeProducts from "../HomeProducts/HomeProducts";
import { useEffect, useRef } from "react";
import { useProductStore } from "../../Stores/productStore";

export default function HomeWrapper() {
  const products = useProductStore((state) => state.products);
  const alreadyRended = useRef(false)
  
  useEffect(() => {
    if (alreadyRended.current) return;
    alreadyRended.current = true;
    // Ya no llamamos a getProducts() aquí, se maneja en HomeProducts con paginación
  }, [])
  
  return (
    <MantineProvider >
      <HomeFilters />
      <HomeProducts />
    </MantineProvider>
  );
}
