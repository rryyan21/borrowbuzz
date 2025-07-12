import React from "react";

const benefits = [
  {
    icon: "💰",
    label: "Save your money",
    desc: "Why buy when you can borrow? Keep those dollars for pizza and coffee instead!"
  },
  {
    icon: "🤝",
    label: "Meet amazing people",
    desc: "Every rental is a chance to connect with fellow Wolverines. Build friendships that last beyond graduation."
  },
  {
    icon: "🛡️",
    label: "Stay safe & secure",
    desc: "Only verified @umich.edu students. No sketchy strangers—just your campus community."
  }
];

const Benefits: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {benefits.map((benefit, i) => (
      <div key={i} className="text-center">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="text-4xl mb-4">{benefit.icon}</div>
          <h3 className="font-bold text-xl text-campusBlue mb-3">{benefit.label}</h3>
          <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
        </div>
      </div>
    ))}
  </div>
);

export default Benefits; 