import React from "react";

const UpgradePage = () => {
  const plans = [
    { id: 1, duration: "1 tháng", price: "39K Bu", benefits: ["Tắt quảng cáo", "Xem phim 4K", "Chat không chờ"],discount:"Giảm 5%" },
    { id: 6, duration: "6 tháng", price: "189K Bu", benefits: ["Tắt quảng cáo", "Xem phim 4K", "Chat không chờ"], discount: "Giảm 19%" },
    { id: 12, duration: "12 tháng", price: "339K Bu", benefits: ["Tắt quảng cáo", "Xem phim 4K", "Chat không chờ"], discount: "Giảm 28%" },
  ];

  return (
    <div className="pt-24 px-6 text-white bg-[#0f0f0f] min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Nâng cấp tài khoản Bus</h1>
      <p className="text-center text-gray-400 mb-10">Chọn gói phù hợp để trải nghiệm xem phim tốt hơn 🚀</p>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-2xl p-6 shadow-lg border border-gray-700 flex flex-col items-center"
          >
            <h2 className="text-xl font-bold mb-2">{plan.duration}</h2>
            <p className="text-yellow-400 text-2xl font-extrabold">{plan.price}</p>
            {plan.discount && <span className="text-red-400 text-sm">{plan.discount}</span>}

            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              {plan.benefits.map((b, idx) => (
                <li key={idx}>✅ {b}</li>
              ))}
            </ul>

            <button className="mt-6 w-full py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-semibold transition">
              Chọn gói này
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpgradePage;
