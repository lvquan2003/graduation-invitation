# Thiệp mời tốt nghiệp (Next.js)
1. `npm install` → `npm run dev`
2. Nội dung chung: `lib/config.js` · Khách: `guests.json` (name: "An" hoặc ["An","Bình"] hoặc ["Hà","Mai","Linh"])
3. Tạo link: `node scripts/links.mjs https://USER.github.io/REPO` (tự cấp mã, lưu links.txt). Commit guests.json.
4. Push lên `main`, Settings → Pages → Source: GitHub Actions

5. Nhạc: đặt file vào `public/music.mp3` (nén nhẹ: `ffmpeg -i goc.mp3 -b:a 96k -ac 1 public/music.mp3`). Nhạc tự phát khi khách chạm mở thiệp, có nút bật/tắt. Không muốn nhạc thì xoá dòng `music` trong lib/config.js.
