import React from "react";
import Link from "next/link";
import { stripe } from "@/src/lib/stripe";
import * as S from "../styles/pages/success";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { SuccessProps } from "../types";
import Stripe from "stripe";
import Head from "next/head";

const Success: React.FC<SuccessProps> = ({ customerName, product }) => {
  return (
    <>
      <Head>
        <title>Compra | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <S.SuccessContainer>
        <h1>Compra efetuada!</h1>

        <S.ImageContainer>
          <Image
            src={product.imageUrl}
            alt="image_product"
            height={120}
            width={110}
          />
        </S.ImageContainer>

        <p>
          Uhul <strong>{customerName}</strong>, sua{" "}
          <strong>{product.name}</strong> já está a caminho da sua casa
        </p>

        <Link href={"/"}>Voltar ao catálogo</Link>
      </S.SuccessContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  params,
}) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details?.name;
  const product = session.line_items?.data[0].price?.product as Stripe.Product;

  return {
    props: {
      customerName: customerName ?? "",
      product: {
        name: String(product?.name),
        imageUrl: String(product?.images[0]),
      },
    },
  };
};

export default Success;
