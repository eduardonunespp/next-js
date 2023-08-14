import { styled } from "../styles";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Head from "next/head";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import * as S from "../styles/pages/";

import camiseta1 from "../assets/MDB8YWNjdF8xTWxtSjRHdWRoOE9qNGJafGZsX3Rlc3RfajMyTE5CczBFZFAzVWN0MmFuc29aZ3B000lvwPxZWz.png";
import camiseta2 from "../assets/MDB8YWNjdF8xTWxtSjRHdWRoOE9qNGJafGZsX3Rlc3RfajMyTE5CczBFZFAzVWN0MmFuc29aZ3B000lvwPxZWz.png";
import camiseta3 from "../assets/MDB8YWNjdF8xTWxtSjRHdWRoOE9qNGJafGZsX3Rlc3RfajMyTE5CczBFZFAzVWN0MmFuc29aZ3B000lvwPxZWz.png";
import { stripe } from "../lib/stripe";
import { GetServerSideProps, GetStaticProps } from "next";
import Stripe from "stripe";
import Link from "next/link";

import { ProductsProps } from "../types";

const Home: React.FC<ProductsProps> = ({ products }) => {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <S.HomeContainer ref={sliderRef} className="keen-slider ">
        {products.map((product) => {
          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              prefetch={false}
            >
              <S.Product className="keen-slider__slide">
                <Image
                  src={product.imageUrl}
                  alt="sim"
                  width={520}
                  height={480}
                />

                <S.Footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </S.Footer>
              </S.Product>
            </Link>
          );
        })}
      </S.HomeContainer>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount !== null ? price.unit_amount / 100 : 0),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  };
};
