import PrimaryButton from "../../../components/Button";
import Globular from "../../../components/Globular";
import HeroBG from "../../../assets/images/hero-bg.png";

const HeroSection = () => {
  return (
    <section
      className="min-h-[max(800px,calc(100vh-100px))] flex items-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${HeroBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Globular />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="text-center relative flex flex-col">
          <div className="pb-25"></div>
          <div>
            <div className="mx-auto z-10">
              <p
                className="lg:text-7xl md:text-5xl sm:text-4xl px-4 text-4xl"
                style={{
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                  boxShadow: "0 0 20px 10px rgba(0, 0, 0, 0.15)",
                  background:
                    "radial-gradient(circle, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.15) 50%, rgba(0, 0, 0, 0.12) 100%)",
                }}
              >
                The First Utility-Driven AI <br/> Ecosystem on Cardano
              </p>
            </div>
            <div className="mx-auto pt-10">
              <p
                className="lg:text-4xl md:text-3xl sm:text-2xl px-4"
                style={{
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                  boxShadow: "0 0 20px 10px rgba(0, 0, 0, 0.15)",
                  background:
                    "radial-gradient(circle, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.15) 50%, rgba(0, 0, 0, 0.12) 100%)",
                }}
              >
                Create, Train, and Monetize Intelligence
              </p>
            </div>
          </div>
          <p className="lg:text-[21px] md:text-[18px] sm:text-[10px] max-w-[435px] mx-auto mt-25">
            Create and tokenize your own AI Agents with a no-code and
            data-integrated process
          </p>
          <div className="mx-auto mt-20">
            <PrimaryButton className="px-15" onClick={() => {}}>Lauch App</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
