import { styled } from "../styles";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

export const Button = styled("button", {
  padding: "10px 20px",
  backgroundColor: "$rocketSeat",
  border: "none",
  borderRadius: "4px",
  color: "#ffffff",

  "&:hover": {
    filter: "brightness(0.5)",
  },
});

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <h1>Home</h1>

      <Button>Entrar</Button>
    </>
  );
}
