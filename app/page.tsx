"use client";
import { AboutSection } from "@/components/about-section";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartProvider } from "@/components/cart/cart-provider";
import { CheckoutDialog } from "@/components/cart/checkout-dialog";
import { CustomOrderDialog } from "@/components/cart/custom-order-dialog";
import { CustomOrdersSection } from "@/components/custom-orders-section";
import { FaqSection } from "@/components/faq-section";
import { Hero } from "@/components/hero";
import { ProductSection } from "@/components/product-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useProducto } from "@/hooks/useProducto";
import { getProductsByCategory } from "@/lib/products";
import { useEffect } from "react";

export default function Home() {
  const { productos } = useProducto();
  useEffect(() => {
    console.log(productos);
  }, []);
  return (
    <CartProvider>
      <SiteHeader />
      <main>
        <Hero />
        <ProductSection
          id="panaderia"
          eyebrow="recién horneado"
          title="Panadería"
          description="Panes y salados caseros para tus desayunos, meriendas y comidas de todos los días."
          products={getProductsByCategory("panaderia")}
        />
        <ProductSection
          id="pasteleria"
          eyebrow="para compartir"
          title="Pastelería"
          description="Tortas y postres para tus mesas cotidianas y tus eventos especiales."
          products={getProductsByCategory("pasteleria")}
        />
        <CustomOrdersSection />
        <AboutSection />
        <FaqSection />
      </main>
      <SiteFooter />
      <CartDrawer />
      <CustomOrderDialog />
      <CheckoutDialog />
    </CartProvider>
  );
}
