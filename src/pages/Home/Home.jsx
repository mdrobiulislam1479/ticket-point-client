import AdvertiseTickets from "./AdvertiseTickets";
import CustomerFeedback from "./CustomerFeedback";
import FAQ from "./FAQ";
import Hero from "./Hero";
import LatestTickets from "./LatestTickets";
import PopularRoutes from "./PopularRoute";
import WhyChooseUs from "./WhyChooseUs";

const Home = () => {
  return (
    <div>
      <title>Ticket Point | Home</title>
      <Hero />
      <LatestTickets />
      <AdvertiseTickets />
      <WhyChooseUs />
      <CustomerFeedback />
      <FAQ />
      <PopularRoutes />
    </div>
  );
};

export default Home;
