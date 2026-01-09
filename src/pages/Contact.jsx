import {
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
  IoLogoTwitter,
  IoLogoLinkedin,
  IoLogoFacebook,
} from "react-icons/io5";
import { toast } from "react-toastify";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Message sent! Our team will get back to you shortly.");
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-base-100 transition-colors duration-300 py-12 px-4">
      <title>Contact Us | Ticket Point</title>

      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-base-content mb-4">
            Get in <span className="text-secondary italic">Touch.</span>
          </h1>
          <p className="text-base-content/60 max-w-2xl mx-auto text-lg">
            Have questions about your booking? Our 24/7 support team is here to
            help you navigate your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* --- LEFT SIDE: CONTACT INFO BENTO --- */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Contact Method: Email */}
            <div className="p-8 rounded-4xl bg-secondary text-secondary-content shadow-xl shadow-secondary/20 group hover:scale-[1.02] transition-transform">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <IoMailOutline size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="opacity-80 text-sm mb-4">
                Response time: within 2 hours
              </p>
              <a
                href="mailto:support@ticketpoint.com"
                className="font-bold hover:underline"
              >
                support@ticketpoint.com
              </a>
            </div>

            {/* Contact Method: Phone */}
            <div className="p-8 rounded-4xl bg-base-200 border border-base-300 group hover:border-secondary transition-colors">
              <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6">
                <IoCallOutline size={28} />
              </div>
              <h3 className="text-xl font-bold text-base-content mb-2">
                Call Support
              </h3>
              <p className="text-base-content/60 text-sm mb-4">
                Sat - Thu, 9am - 6pm
              </p>
              <a
                href="tel:+1234567890"
                className="font-bold text-base-content hover:text-secondary"
              >
                +8801900000000
              </a>
            </div>

            {/* Contact Method: Location */}
            <div className="p-8 rounded-4xl bg-accent text-accent-content">
              <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center mb-6">
                <IoLocationOutline size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Headquarters</h3>
              <p className="opacity-70 text-sm">123 Khulna, Bangladesh</p>
            </div>

            {/* Social Connect */}
            <div className="p-6 rounded-4xl bg-base-200 border border-base-300 flex justify-between items-center px-10">
              <a
                href="#"
                className="text-base-content/40 hover:text-secondary transition-colors"
              >
                <IoLogoFacebook size={24} />
              </a>
              <a
                href="#"
                className="text-base-content/40 hover:text-secondary transition-colors"
              >
                <IoLogoTwitter size={24} />
              </a>
              <a
                href="#"
                className="text-base-content/40 hover:text-secondary transition-colors"
              >
                <IoLogoLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* --- RIGHT SIDE: CONTACT FORM --- */}
          <div className="lg:col-span-8">
            <div className="bg-base-100 border border-base-300 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
              {/* Decorative Background Blob */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />

              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="form-control">
                    <label className="label-text font-bold text-base-content/70 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      className="input input-bordered w-full h-14 rounded-2xl bg-base-200 border-none focus:ring-2 focus:ring-secondary/50 transition-all mt-2"
                      required
                    />
                  </div>
                  {/* Email Input */}
                  <div className="form-control">
                    <label className="label-text font-bold text-base-content/70 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      className="input input-bordered w-full h-14 rounded-2xl bg-base-200 border-none focus:ring-2 focus:ring-secondary/50 transition-all mt-2"
                      required
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="form-control">
                  <label className="label-text font-bold text-base-content/70 mb-2">
                    Subject
                  </label>
                  <select className="select select-bordered w-full h-14 rounded-2xl bg-base-200 border-none focus:ring-2 focus:ring-secondary/50 transition-all mt-2">
                    <option disabled selected>
                      How can we help?
                    </option>
                    <option>Booking Inquiry</option>
                    <option>Refund Request</option>
                    <option>Partnership</option>
                    <option>Technical Issue</option>
                  </select>
                </div>

                {/* Message Input */}
                <div className="form-control">
                  <label className="label-text font-bold text-base-content/70 mb-2">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    placeholder="Tell us more about your inquiry..."
                    className="textarea textarea-bordered w-full rounded-2xl bg-base-200 border-none focus:ring-2 focus:ring-secondary/50 transition-all p-4 text-base mt-2"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-secondary w-full h-14 rounded-2xl text-white font-bold text-lg shadow-lg shadow-secondary/20 hover:scale-[1.01] active:scale-95 transition-all mt-4"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
