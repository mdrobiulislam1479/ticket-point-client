import { motion } from "framer-motion";
import { IoHelpCircleOutline } from "react-icons/io5";

const homeFaqs = [
  {
    id: 1,
    question: "How do I get my ticket after payment?",
    answer:
      "Your ticket is generated instantly! You can download it from the 'My Bookings' section in your dashboard, and a copy is also sent to your registered email.",
  },
  {
    id: 2,
    question: "Are there any hidden service charges?",
    answer:
      "Transparency is our priority. The price you see on the search result is the final price. We do not add hidden fees at the checkout.",
  },
  {
    id: 3,
    question: "What if the bus/train is delayed?",
    answer:
      "We provide real-time updates via SMS and Email. If a journey is cancelled by the operator, you are entitled to a 100% automatic refund.",
  },
];

const FAQ = () => {
  return (
    <section className="py-24 bg-base-200/50 rounded-3xl">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left Side: Content & CTA */}
          <div className="lg:w-1/3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary font-bold text-sm mb-6">
              <IoHelpCircleOutline size={20} />
              <span>Support Center</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-base-content mb-6 leading-tight">
              Any <span className="text-secondary italic">Questions?</span>
            </h2>
            <p className="text-base-content/60 text-lg mb-8">
              We've gathered the most common queries to help you book your
              journey faster.
            </p>
          </div>

          {/* Right Side: Accordion */}
          <div className="lg:w-2/3 w-full space-y-4">
            {homeFaqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="collapse collapse-arrow bg-base-100 rounded-4xl border border-base-300 group-hover:border-secondary/30 transition-all shadow-sm">
                  <input
                    type="radio"
                    name="home-faq"
                    defaultChecked={index === 0}
                  />
                  <div className="collapse-title text-xl font-bold p-6 px-8 flex items-center gap-4">
                    <span className="text-secondary opacity-30 text-2xl font-black">
                      0{index + 1}
                    </span>
                    {faq.question}
                  </div>
                  <div className="collapse-content px-8 lg:ml-12">
                    <p className="text-base-content/60 pb-6 leading-relaxed text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
