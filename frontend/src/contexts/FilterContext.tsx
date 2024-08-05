// src/context/FilterContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface FilterContextProps {
  genre: string;
  priceRange: [number, number];
  search: string;
  setGenre: (genre: string) => void;
  setPriceRange: (priceRange: [number, number]) => void;
  setSearch: (search: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [genre, setGenre] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <FilterContext.Provider
      value={{
        genre,
        priceRange,
        search,
        setGenre,
        setPriceRange,
        setSearch,
        setCurrentPage,
        currentPage,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
