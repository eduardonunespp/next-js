import React from "react";
import { useRouter } from "next/router";
import { stringify } from "querystring";
import * as S from '../../styles/pages'
import { } from '../'

const Product: React.FC = () => {
  const { query } = useRouter();

  return (
    <S.ProductContainer>
        <S.ImageContainer>
          
        </S.ImageContainer>
        <S.ProductDetails>
            <h1>Camiseta X</h1>
            <span>R$ 79,90</span>

            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis cumque dignissimos eveniet fuga blanditiis repellat enim repellendus repudiandae quia minus perferendis expedita accusamus id mollitia suscipit nisi accusantium, natus excepturi.</p>
        
            <button>
                Comprar agora
            </button>
        
        </S.ProductDetails>
    </S.ProductContainer>
  );
};

export default Product;
