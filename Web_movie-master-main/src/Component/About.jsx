// src/Component/About.jsx
import React from 'react';

const team = [
  {
    name: "Đoàn Tuấn Quỳnh",
    role: "Backend",
    avatar: "/avt2.jpg",
  },
  {
    name: "Lường Ngọc Lâm",
    role: "Frontend",
    avatar: "/avt.jpg",
  },
  {
    name: "Lường Ngọc Lâm",
    role: "UI/UX",
    avatar: "/avt.jpg",
  },
];

function About() {
  return (
    <div className="container px-4 sm:px-6 lg:px-8 pt-28 text-white">
      {/* Introduction Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-yellow-400">Giới thiệu</h1>
        <p className="text-lg mb-2 max-w-2xl mx-auto">
          Busi Cinema - Nền Tảng Xem Phim Trực Tuyến Miễn Phí
        </p>
        <p className="text-lg max-w-3xl mx-auto leading-relaxed text-gray-300">
          Busi Cinema là nền tảng xem phim trực tuyến miễn phí, cung cấp một không gian giải trí đỉnh cao cho hàng triệu người dùng với tiêu chí chất lượng, tiện lợi và phong phú. 
          Được thành lập với sứ mệnh đem lại trải nghiệm giải trí hoàn toàn miễn phí, Busi Cinema đã và đang trở thành điểm đến quen thuộc cho những người yêu thích phim ảnh từ khắp nơi.
        </p>
      </section>

      {/* Features Section */}
      <section className="mb-12 max-w-4xl mx-auto text-gray-300 leading-relaxed">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">Tính năng nổi bật</h2>
        <p className="mb-4">
          <strong>Giao Diện Thân Thiện, Dễ Sử Dụng:</strong> Busi Cinema thiết kế giao diện tối giản, thân thiện để bạn dễ dàng khám phá và tìm kiếm những bộ phim yêu thích.
        </p>
        <p className="mb-4">
          <strong>Kho Phim Phong Phú, Đáp Ứng Mọi Thể Loại:</strong> Từ hành động, lãng mạn, khoa học viễn tưởng, hoạt hình, đến kinh dị và phiêu lưu. Không ngừng cập nhật, mang đến phim mới và chất lượng nhất.
        </p>
        <p className="mb-4">
          <strong>Chất Lượng Video Đỉnh Cao:</strong> Hỗ trợ từ HD đến 4K, đảm bảo trải nghiệm chân thực như đang xem tại rạp.
        </p>
        <p className="mb-4">
          <strong>Xem Phim Miễn Phí Hoàn Toàn:</strong> Người dùng có thể truy cập và thưởng thức phim mà không cần chi trả bất kỳ khoản phí nào.
        </p>
        <p className="mb-4">
          <strong>Xem Phim Mọi Lúc, Mọi Nơi:</strong> Hoạt động trên máy tính, điện thoại và cả các thiết bị thông minh khác.
        </p>
      </section>

      {/* Team Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">Thông tin nhóm</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-3xl shadow-xl p-6 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-32 h-32 rounded-full border-4 border-yellow-500 mb-4 object-cover"
              />
              <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
              <p className="text-gray-400 font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Support Section */}
      <section className="flex flex-col items-center text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-yellow-400">Ủng hộ</h2>
        <img
          src="/qr.jpg"
          alt="QR Code"
          className="w-56 h-56 border-4 border-yellow-500 rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
        />
        <p className="mt-4 text-gray-400">
          Quét mã QR để ủng hộ chúng tôi xây dựng và phát triển trang web này.
        </p>
      </section>
    </div>
  );
}

export default About;
