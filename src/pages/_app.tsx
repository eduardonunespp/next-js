import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { LogoImg } from "../assets/logo";
import logoImg from "../assets/logo.svg";
import { Container, Header } from '../styles/pages'
import Image from 'next/image'

console.log(logoImg);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>

      <Header>
    
        <Image src={logoImg.src} alt="imgLogo" width={100} height={100} />

      </Header>

      <Component {...pageProps} />

    </Container>
    
  );
}
