import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <div className="py-12">
      {/* Footer contains the contact form */}
      <div className="container mx-auto px-6">
        <h1 className="text-6xl font-serif mb-12 text-center">Contact Us</h1>
        <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-16">
          For all inquiries, please use the form below or reach out to our management team directly.
        </p>
      </div>
    </div>
  );
}
