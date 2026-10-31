// ✏️ NỘI DUNG CHUNG. {who} tự thành "bạn An & Bình" (hoặc "bạn" nếu không có tên)
export const config = {
  name: "Nguyễn Thanh Huyền", // mỗi chữ một dòng
  // intro: "Mình trân trọng kính mời {who} đến dự lễ tốt nghiệp của mình",
  intro: "Trân trọng kính mời bạn đến dự lễ tốt nghiệp của mình",
  day: "08",
  month: "Tháng 11",   // ⚠️ nhớ sửa đúng tháng
  year: "2026",
  time: "11:30 - 12:30",
  place: "Trường Đại học Mở TP HCM",
  address: "Số 97 Võ Văn Tần, Xuân Hòa, TP Hồ Chí Minh", // ⚠️ địa chỉ thật
  mapLink: "https://maps.app.goo.gl/mDVVJ882DSwSGrxG8",
  parking: {
    title: "Gợi ý gửi xe",
    lines: [
      "Hầm xe OCB (123-127 Võ Văn Tần)",
      "Công viên Tao Đàn"
    ],
  },
  message:
    "Cảm ơn bạn vì đã là một phần thanh xuân tươi đẹp của mình. Sự có mặt của bạn sẽ là món quà ý nghĩa nhất trong ngày đặc biệt này.",
  rsvpLink: "", // link Zalo / Messenger / Google Form, để trống thì ẩn nút
  rsvpText: "Xác nhận tham dự",
  footer: "Hẹn gặp bạn ♡",
  music: "/music.mp3", // file nhạc đặt vào public/music.mp3 (xoá dòng này nếu không dùng nhạc)
  photos: ["https://res.cloudinary.com/fulahwzr/image/upload/v1793425280/chinh.jpg", ""], // 2 link ảnh Cloudinary (ảnh dọc 3:4 là đẹp nhất)
};
