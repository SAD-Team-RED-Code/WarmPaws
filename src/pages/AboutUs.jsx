import React, { useState } from "react";

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("health");

  const stats = [
    { num: "8K+", label: "Pets adopted" },
    { num: "4.8", label: "Avg. rating" },
    { num: "5K+", label: "Families served" },
    { num: "200+", label: "Rescue partners" },
  ];

  const services = {
    health: [
      { icon: "🩺", bg: "#E6F1FB", title: "Vet consultation", desc: "On-demand access to certified vets across Dhaka, Chittagong, and Sylhet for checkups, vaccinations, and treatment." },
      { icon: "💉", bg: "#EAF3DE", title: "Vaccination scheduling", desc: "Track and schedule essential vaccines for your pet — rabies, distemper, parvo, and more." },
      { icon: "🧪", bg: "#FAEEDA", title: "Lab & diagnostics", desc: "Blood panels, parasite screening, and diagnostic tests at partner clinics across Bangladesh." },
      { icon: "🐾", bg: "#EEEDFE", title: "Preventive care plans", desc: "Monthly health plans tailored to your pet's breed, age, and lifestyle for long-term wellness." },
    ],
    products: [
      { icon: "🛒", bg: "#FAEEDA", title: "Pet food & nutrition", desc: "Locally available and imported pet food brands suited for dogs, cats, birds, and small animals." },
      { icon: "🧴", bg: "#E1F5EE", title: "Grooming supplies", desc: "Shampoos, brushes, nail clippers, and coat care products available for delivery across BD." },
      { icon: "🏠", bg: "#FBEAF0", title: "Accessories & housing", desc: "Cages, beds, leashes, collars, toys, and carriers — everything your pet needs at home." },
      { icon: "💊", bg: "#E6F1FB", title: "Medicines & supplements", desc: "Vet-recommended medicines, dewormers, flea treatments, and health supplements." },
    ],
    adoption: [
      { icon: "🐶", bg: "#EAF3DE", title: "Adopt a pet", desc: "Browse verified dogs, cats, and small animals available for adoption from shelters and rescue groups across Bangladesh." },
      { icon: "🤝", bg: "#FAEEDA", title: "Rescue support", desc: "Partner with 200+ rescue organizations — report stray animals, donate, or volunteer your time." },
      { icon: "📋", bg: "#EEEDFE", title: "Adoption screening", desc: "We guide adopters through a simple screening process to ensure every pet finds the right home." },
      { icon: "🏡", bg: "#FBEAF0", title: "Post-adoption care", desc: "Dedicated support for new pet owners — feeding guides, vet referrals, and behaviorist access." },
    ],
  };

  const team = [
    { initials: "SR", name: "Samira Rahman", role: "Co-founder & CEO", bio: "Veterinarian with 10+ years in small animal care across Dhaka.", bg: "#FAEEDA", color: "#633806" },
    { initials: "AH", name: "Arif Hossain", role: "Co-founder & CTO", bio: "Software engineer and proud dog dad from Chittagong.", bg: "#E1F5EE", color: "#0F6E56" },
    { initials: "NI", name: "Nadia Islam", role: "Head of Adoptions", bio: "Animal rescue advocate with ties to 50+ shelters nationwide.", bg: "#E6F1FB", color: "#185FA5" },
    { initials: "TK", name: "Tanvir Khan", role: "Vet Partnerships Lead", bio: "Connects WarmPaws with top-rated vets across all major BD cities.", bg: "#EEEDFE", color: "#534AB7" },
  ];

  const values = [
    { dot: "#854F0B", title: "Animal welfare first", desc: "Every service, product, and decision is guided by the wellbeing of animals in Bangladesh — not profit." },
    { dot: "#0F6E56", title: "Local expertise", desc: "Our vets, rescue partners, and advisors are based in Bangladesh and understand local breeds and conditions." },
    { dot: "#185FA5", title: "Accessible care", desc: "We make quality pet care reachable for all — across Dhaka, Chittagong, Sylhet, Rajshahi, and beyond." },
    { dot: "#534AB7", title: "Rescue & responsibility", desc: "We actively support stray animal rescue and promote adoption over purchase at every opportunity." },
  ];

  const testimonials = [
    { text: "WarmPaws helped me adopt my cat Mimi from a Dhaka shelter. The screening process was smooth and the post-adoption support was incredible.", author: "Fatema B.", pet: "Owner of Mimi, Domestic Shorthair" },
    { text: "I found a great vet near Mirpur through WarmPaws within minutes. My dog's vaccination records are all tracked in one place now.", author: "Rafi M.", pet: "Owner of Rocky, Labrador Mix" },
    { text: "Ordered pet food and grooming supplies — delivered to Sylhet in 2 days. Best pet platform in Bangladesh by far.", author: "Priya D.", pet: "Owner of Coco, Beagle" },
  ];

  const tabs = [
    { key: "health", label: "Pet health care" },
    { key: "products", label: "Pet products" },
    { key: "adoption", label: "Adoption & rescue" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">

      {/* Hero */}
      <section className="px-6 pt-12 pb-8 text-center border-b border-gray-100">
        <span className="inline-block bg-amber-100 text-amber-900 text-xs font-medium px-4 py-1 rounded-full mb-4">
          Bangladesh's trusted pet care platform
        </span>
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug mb-3">
          Caring for every paw,<br />across Bangladesh
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto mb-6 text-sm leading-relaxed">
          WarmPaws brings together pet health care, quality products, and animal adoption
          under one roof — built specifically for pet owners and animal lovers in Bangladesh.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button className="bg-amber-800 hover:bg-amber-900 text-amber-50 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
            Explore services →
          </button>
          <button className="border border-gray-200 hover:bg-gray-50 text-gray-800 px-5 py-2.5 rounded-lg text-sm transition-colors">
            Adopt a pet
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-8 border-b border-gray-100">
        <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-1">Who we are</p>
        <h2 className="text-xl font-semibold mb-2">Our story</h2>
        <p className="text-sm text-gray-500 leading-relaxed max-w-xl mb-6">
          Founded by a team of vets, rescue volunteers, and tech builders from Dhaka, WarmPaws was created
          to fill the gap in reliable, accessible pet care in Bangladesh. From health to adoption to everyday
          products — we've got your pet covered.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-semibold text-amber-800">{s.num}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services with tabs */}
      <section className="px-6 py-8 border-b border-gray-100">
        <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-1">What we do</p>
        <h2 className="text-xl font-semibold mb-5">Our services</h2>

        {/* Tab bar */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                activeTab === t.key
                  ? "bg-amber-800 text-amber-50 border-amber-800"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {services[activeTab].map((s) => (
            <div key={s.title} className="bg-white border border-gray-100 rounded-xl p-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-base mb-3"
                style={{ background: s.bg }}
              >
                {s.icon}
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">{s.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="px-6 py-8 border-b border-gray-100">
        <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-1">Our team</p>
        <h2 className="text-xl font-semibold mb-5">The people behind WarmPaws</h2>
        <div className="grid grid-cols-2 gap-3">
          {team.map((m) => (
            <div key={m.name} className="bg-white border border-gray-100 rounded-xl p-4 flex gap-3 items-start">
              <div
                className="w-10 h-10 min-w-[40px] rounded-full flex items-center justify-center text-xs font-medium"
                style={{ background: m.bg, color: m.color }}
              >
                {m.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{m.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{m.role}</p>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-8 border-b border-gray-100">
        <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-1">What we stand for</p>
        <h2 className="text-xl font-semibold mb-5">Our values</h2>
        <div className="flex flex-col gap-4">
          {values.map((v) => (
            <div key={v.title} className="flex gap-3 items-start">
              <div className="w-2 h-2 min-w-[8px] rounded-full mt-1.5" style={{ background: v.dot }} />
              <div>
                <p className="text-sm font-medium text-gray-900">{v.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed mt-1">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-8 border-b border-gray-100">
        <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-1">Happy clients</p>
        <h2 className="text-xl font-semibold mb-5">What pet owners say</h2>
        <div className="flex flex-col gap-3">
          {testimonials.map((t) => (
            <div key={t.author} className="bg-white border border-gray-100 rounded-xl p-4">
              <p className="text-xs text-gray-500 italic leading-relaxed">"{t.text}"</p>
              <p className="text-xs font-medium text-gray-900 mt-3">{t.author}</p>
              <p className="text-xs text-gray-400">{t.pet}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-8 border-b border-gray-100">
        <div className="bg-amber-50 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-amber-950 mb-2">
            Ready to give your pet the care they deserve?
          </h3>
          <p className="text-sm text-amber-800 mb-5">
            Join thousands of pet owners and rescue volunteers across Bangladesh.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button className="bg-amber-800 hover:bg-amber-900 text-amber-50 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
              Get started →
            </button>
            <button className="border border-amber-300 hover:bg-amber-100 text-amber-900 px-5 py-2.5 rounded-lg text-sm transition-colors">
              Browse adoptions
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 text-center">
        <p className="text-base font-semibold text-gray-900">WarmPaws</p>
        <p className="text-sm text-gray-400 mt-1">Developed with care by Red_Coders · Dhaka, Bangladesh</p>
        <div className="flex gap-5 justify-center mt-4 flex-wrap">
          {["Health care", "Products", "Adoptions", "Contact us", "Privacy policy"].map((link) => (
            <a key={link} href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              {link}
            </a>
          ))}
        </div>
      </footer>

    </div>
  );
};

export default AboutUs;