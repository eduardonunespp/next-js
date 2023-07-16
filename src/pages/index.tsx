import { styled } from "../styles";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import * as S from "../styles/pages/";
import Image from "next/image";

import camiseta1 from "../assets/MDB8YWNjdF8xTWxtSjRHdWRoOE9qNGJafGZsX3Rlc3RfajMyTE5CczBFZFAzVWN0MmFuc29aZ3B000lvwPxZWz.png";
import camiseta2 from "../assets/MDB8YWNjdF8xTWxtSjRHdWRoOE9qNGJafGZsX3Rlc3RfajMyTE5CczBFZFAzVWN0MmFuc29aZ3B000lvwPxZWz.png";
import camiseta3 from "../assets/MDB8YWNjdF8xTWxtSjRHdWRoOE9qNGJafGZsX3Rlc3RfajMyTE5CczBFZFAzVWN0MmFuc29aZ3B000lvwPxZWz.png";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <h1>Home</h1>

      <S.HomeContainer>
        <S.Product>
          <Image src={camiseta1} alt="sim" width={520} height={480} />

          <S.Footer>
            <strong>Camiseta X</strong>
            <span>R$ 79,98</span>
          </S.Footer>
        </S.Product>
        <S.Product>
          <Image src={camiseta1} alt="sim" width={520} height={480} />

          <S.Footer>
            <strong>Camiseta X</strong>
            <span>R$ 79,98</span>
          </S.Footer>
        </S.Product>
      </S.HomeContainer>
    </>
  );
}
