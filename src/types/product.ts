type Product = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  description?: string;
  defaultPriceId: string
};

export type ProductsProps = {
  products: Product[];
};

export type ProductProps = {
  product: Product;
};
