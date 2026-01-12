import AdvertiseTickets from "./AdvertiseTickets";
import CustomerFeedback from "./CustomerFeedback";
import FAQ from "./FAQ";
import Hero from "./Hero";
import LatestTickets from "./LatestTickets";
import PartnerSlider from "./PartnerSlider";
import PopularRoutes from "./PopularRoute";
import WhyChooseUs from "./WhyChooseUs";

const Home = () => {
  return (
    <div className="flex flex-col gap-20">
      <title>Ticket Point | Home</title>
      <Hero />
      <PartnerSlider />
      <PopularRoutes />
      <LatestTickets />
      <AdvertiseTickets />
      <WhyChooseUs />
      <CustomerFeedback />
      <FAQ />
    </div>
  );
};

export default Home;
