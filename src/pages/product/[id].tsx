import React, { useState } from "react";
import { useRouter } from "next/router";
import { stringify } from "querystring";
import * as S from "../../styles/pages";
import {} from "../";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { stripe } from "@/src/lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import Head from 'next/head'
import axios from "axios";

import { ProductProps } from "../../types";

const Product: React.FC<ProductProps> = ({ product }) => {
  const { query } = useRouter();

  const [ isCreatingCheckoutSession, setIsCreatingCheckoutSession ] = useState<boolean>(false)

  const handleBuyProduct = async () => {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (error) {

      setIsCreatingCheckoutSession(false)

      alert("Falha ao redirecionar ao checkout!");
    }
  };

  const { isFallback } = useRouter();

  if (isFallback) {
    <p>...loading</p>;
  }

  const RequestId = () => {
    console.log(product.defaultPriceId);
  };

  return (
    <>
        <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
    
    <S.ProductContainer>
      <S.ImageContainer>
        <Image
          src={product.imageUrl}
          alt="Imagem do Produto"
          width={520}
          height={480}
        />
      </S.ImageContainer>
      <S.ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>Comprar agora</button>
      </S.ProductDetails>
    </S.ProductContainer>
    </>
  );
};

export default Product;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_OHQ7vmpd5kyNSy" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount !== null ? price.unit_amount / 100 : 0),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
  };
};
