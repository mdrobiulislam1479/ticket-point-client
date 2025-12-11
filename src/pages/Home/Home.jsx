import CustomerFeedback from "./CustomerFeedback";
import Hero from "./Hero";
import LatestTickets from "./LatestTickets";
import WhyChooseUs from "./WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestTickets />
      <WhyChooseUs />
      <CustomerFeedback />
    </div>
  );
};

export default Home;
