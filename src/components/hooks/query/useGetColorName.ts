"use client";

import { useQuery } from "@tanstack/react-query";

import { getColorName } from "@/service/imageColor";

const useGetColorName = (hex: string) => {
  const query = useQuery({
    queryKey: ["image"],
    queryFn: () => getColorName(hex),
    staleTime: 30000 /*ms*/,
    enabled: false,
  });

  return query;
};

export { useGetColorName };
