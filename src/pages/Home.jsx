import Hero from "../components/home/Hero";
import FeaturesStrip from "../components/home/FeaturesStrip";
import ShopByCategory from "../components/home/ShopByCategory";
import FeaturedCollection from "../components/home/FeaturedCollection";
import CustomJewelryCTA from "../components/home/CustomJewelryCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesStrip />
      <ShopByCategory />
      <FeaturedCollection />
      <CustomJewelryCTA />
    </>
  );
}
