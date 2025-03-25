import { Book, FooterIcon, Telegram, X } from "../assets";

const Footer = () => {
  return (
    <footer className="bg-background-tertiary py-20 text-text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center justify-between ">
          <FooterIcon  />
          <div className="flex items-center gap-10">
            <X className="cursor-pointer" onClick={() => window.open("https://x.com/CaiNetwork_", "_blank")}/>
            <Telegram className="cursor-pointer"/>
            <Book className="cursor-pointer"/>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-between">
          <div>
            <p className="text-primary-300 text-lg">
              AI for Real-world Use Cases.
            </p>
            <p className="text-primary-300 text-lg">
              AI for Humanity.
            </p>
          </div>
          <div className="flex gap-10">
            <span className="text-primary-300 text-lg">© 2025</span>
            <span className="text-primary-300 text-lg">Privacy — Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
