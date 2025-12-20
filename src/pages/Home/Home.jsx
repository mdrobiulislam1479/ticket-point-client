import AdvertiseTickets from "./AdvertiseTickets";
import CustomerFeedback from "./CustomerFeedback";
import Hero from "./Hero";
import LatestTickets from "./LatestTickets";
import WhyChooseUs from "./WhyChooseUs";

const Home = () => {
  return (
    <div>
      <title>Ticket Point | Home</title>
      <Hero />
      <AdvertiseTickets />
      <LatestTickets />
      <WhyChooseUs />
      <CustomerFeedback />
    </div>
  );
};

export default Home;
