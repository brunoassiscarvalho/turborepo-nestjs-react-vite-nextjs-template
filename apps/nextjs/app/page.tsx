"use client";
import { useState } from "react";
import type { Product } from "@repo/interfaces";
import { Button } from "@repo/ui";

function App() {
  const [product] = useState<Product>({
    id: "7b23",
    name: "Playstation 5 Pro",
    description:
      "The ultimate gaming console with enhanced ray tracing, 4K high-fidelity graphics, and ultra-high-speed SSD.",
    price: 699.99,
    category: "Electronics",
    createdAt: new Date(),
  });

  return (
    <Button>
      Buy {product.name} for ${product.price}
    </Button>
  );
}

export default App;
