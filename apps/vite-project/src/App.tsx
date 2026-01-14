import { useState } from "react";
import type { Product } from "@repo/interfaces";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@repo/ui";
import { LoginButton } from "./login/LoginButton";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  const [product] = useState<Product>({
    id: "7b23",
    name: "Playstation 5 Pro",
    description:
      "The ultimate gaming console with enhanced ray tracing, 4K high-fidelity graphics, and ultra-high-speed SSD.",
    price: 699.99,
    category: "Electronics",
    createdAt: new Date(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-lg text-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-8 bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Cochrane</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Collaborative system design dashboard
          </p>
          <LoginButton />
        </div>
      </div>
    );
  }

  return (
    <Button>
      Buy {product.name} for ${product.price}
    </Button>
  );
}

export default App;
