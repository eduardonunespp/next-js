import { styled } from "../styles";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import * as S from "../styles/pages/";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import camiseta1 from "../assets/MDB8YWNjdF8xTWxtSjRHdWRoOE9qNGJafGZsX3Rlc3RfajMyTE5CczBFZFAzVWN0MmFuc29aZ3B000lvwPxZWz.png";
import camiseta2 from "../assets/MDB8YWNjdF8xTWxtSjRHdWRoOE9qNGJafGZsX3Rlc3RfajMyTE5CczBFZFAzVWN0MmFuc29aZ3B000lvwPxZWz.png";
import camiseta3 from "../assets/MDB8YWNjdF8xTWxtSjRHdWRoOE9qNGJafGZsX3Rlc3RfajMyTE5CczBFZFAzVWN0MmFuc29aZ3B000lvwPxZWz.png";
import { stripe } from "../lib/stripe";
import { GetServerSideProps, GetStaticProps } from "next";
import Stripe from "stripe";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[];
};

const Home: React.FC<Props> = ({ products }) => {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <>
      <S.HomeContainer ref={sliderRef} className="keen-slider ">
        {products.map((product) => {
          return (
            <S.Product key={product.id} className="keen-slider__slide">
              <Image
                src={product.imageUrl}
                alt="sim"
                width={520}
                height={480}
              />

              <S.Footer>
                <strong>{product.name}</strong>
                <span>{'R$ ' + product.price}</span>
              </S.Footer>
            </S.Product>
          );
        })}

        <S.Product className="keen-slider__slide">
          <Image src={camiseta1} alt="sim" width={520} height={480} />

          <S.Footer>
            <strong>Camiseta X</strong>
            <span>R$ 79,98</span>
          </S.Footer>
        </S.Product>
        <S.Product className="keen-slider__slide">
          <Image src={camiseta1} alt="sim" width={520} height={480} />

          <S.Footer>
            <strong>Camiseta X</strong>
            <span>R$ 79,98</span>
          </S.Footer>
        </S.Product>
        <S.Product className="keen-slider__slide">
          <Image src={camiseta1} alt="sim" width={520} height={480} />

          <S.Footer>
            <strong>Camiseta X</strong>
            <span>R$ 79,98</span>
          </S.Footer>
        </S.Product>

        <S.Product className="keen-slider__slide">
          <Image src={camiseta1} alt="sim" width={520} height={480} />

          <S.Footer>
            <strong>Camiseta X</strong>
            <span>R$ 79,98</span>
          </S.Footer>
        </S.Product>
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
      price: price.unit_amount !== null? price.unit_amount / 100  : '' 
    };
  });

  console.log("response: ", response.data);

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2
  };
};
