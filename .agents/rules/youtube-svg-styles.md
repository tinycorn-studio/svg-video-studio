---
trigger: always_on
description: Quy chuẩn dựng video YouTube bằng SVG trên nhánh HyperFrames (HTML + SVG + GSAP Paused Timeline) với 7 phong cách đồ họa và Tầng Tài Nguyên SVG/Icon Hỗ Trợ.
---

# Quy Chuẩn Dựng Video YouTube Bằng SVG Đa Phong Cách (Nhánh HyperFrames)

Khi người dùng yêu cầu tạo video, hoạt hình SVG, hoặc cảnh quay (scene) trên nhánh `hyperframes` này, hãy tuân thủ nghiêm ngặt kiến trúc của **HyperFrames (`heygen-com/hyperframes`)**, quy tắc chọn tài nguyên SVG và bộ 7 phong cách sau:

---

## 1. Nguyên tắc Cốt lõi của HyperFrames (Bắt buộc)
- **Kiến trúc HTML-Native**: Mỗi video composition được định nghĩa trong file HTML (thường là `index.html`) với thẻ gốc `<div id="stage" data-composition-id="main" data-start="0" data-duration="..." data-width="1920" data-height="1080">`.
- **Cơ chế Điều khiển Thời gian (Deterministic Seekable Timeline)**:
  - Luôn sử dụng **GSAP Timeline ở chế độ tạm dừng (`paused: true`)** và đăng ký vào `window.__timelines[<compositionId>]` để trình xuất video của HyperFrames tua (seek) chính xác từng frame:
    ```javascript
    const tl = gsap.timeline({ paused: true });
    // Định nghĩa các bước hoạt hình SVG theo giây...
    window.__timelines = window.__timelines || {};
    window.__timelines.main = tl;
    ```
  - Chỉ animate các thuộc tính tối ưu cho GPU và SVG (`transform`, `opacity`, `strokeDashoffset`, hoặc thuộc tính `attr: { d: ... }`). Không dùng `setTimeout` hoặc `setInterval`.
- **Cách kết hợp Thư viện SVG Nhóm 3 vào GSAP Timeline của HyperFrames**:
  - **Hiệu ứng tự vẽ nét SVG (Line Drawing)**: Tính chiều dài path `const len = pathEl.getTotalLength()`, đặt `gsap.set(pathEl, { strokeDasharray: len, strokeDashoffset: len })`, rồi dùng `tl.to(pathEl, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, startTime)`.
  - **Biến hình SVG với `flubber`**: Tạo hàm nội suy `const interp = flubber.interpolate(pathA, pathB)`, sau đó dùng một biến proxy `{ t: 0 }` trong GSAP:
    ```javascript
    const proxy = { t: 0 };
    tl.to(proxy, {
      t: 1,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => pathEl.setAttribute("d", interp(proxy.t)),
    }, startTime);
    ```
  - **Nảy đàn hồi (Spring / Pop-in)**: Dùng `ease: "back.out(1.7)"` hoặc `ease: "elastic.out(1, 0.5)"` của GSAP.

---

## 2. Tầng Tài Nguyên SVG Hỗ Trợ & Quy Tắc Khi Nào Cần Sử Dụng (Shared SVG Asset Layer)

Kho thư viện SVG đóng vai trò là **Tầng Tài Nguyên Hỗ Trợ Dùng Chung cho cả 7 Style**. AI phải tuân thủ quy tắc phân loại sau để quyết định khi nào tự viết code SVG và khi nào gọi thư viện:

### A. Khi nào AI tự viết code SVG chay?
- Khi vẽ **hình học cơ bản, sơ đồ khối (flowchart), đường nối, mũi tên, lưới tọa độ, quỹ đạo, biểu đồ số liệu (`d3`), khung giao diện HUD, hoặc người que (`roughjs`)**.

### B. Khi nào AI BẮT BUỘC phải gọi Kho Icon & Tài nguyên SVG Hỗ trợ?
- **CẤM AI tự gõ tọa độ `<path>` hoặc `<polygon>` thủ công để vẽ các vật thể thực tế phức tạp** (như: *con vật, bộ não, xe cộ, vũ khí, cờ quốc gia, logo thương hiệu, tòa nhà, thực phẩm, thiết bị y tế*).
- Trong HTML của HyperFrames, nhúng Web Component của Iconify:
  ```html
  <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
  <iconify-icon icon="twemoji:rocket" width="96" height="96"></iconify-icon>
  ```
  hoặc tải SVG trực tiếp từ API `https://api.iconify.design/<prefix>/<name>.svg`.

| Chủ đề Vật thể cần hiển thị | Bộ Prefix Iconify khuyên dùng | Ví dụ mã Icon (`icon="..."`) |
| :--- | :--- | :--- |
| **Icon Màu Phẳng Đa Dụng (Đẹp cho Style 2, 3, 7)** | `twemoji:*`, `noto:*`, `flat-color-icons:*` | `twemoji:rocket`, `noto:brain`, `flat-color-icons:money-transfer` |
| **Cờ Quốc Gia & Địa Lý** | `circle-flags:*`, `flag:*` | `circle-flags:vn`, `circle-flags:us`, `circle-flags:jp` |
| **Logo Công Nghệ, AI, Thương Hiệu** | `logos:*`, `simple-icons:*`, `devicon:*` | `logos:openai-icon`, `logos:youtube-icon`, `logos:bitcoin` |
| **Khoa Học, Quân Sự, Lịch Sử, Game (Nét Vector)** | `game-icons:*`, `healthicons:*` | `game-icons:nuclear-bomb`, `game-icons:submarine`, `healthicons:virus` |
| **Icon Nét Mảnh Tối Giản (Đẹp cho Style 1, 4, 5, 6)** | `lucide:*`, `tabler:*`, `mdi:*`, `ph:*` | `lucide:cpu`, `tabler:satellite`, `mdi:atom`, `ph:planet-duotone` |

### C. Nguồn Tra Cứu & Tải File SVG / Lottie Phức Tạp (Đặt vào `public/svg/`)
- **Tra cứu tên 200,000+ Iconify Icons:** `https://icones.js.org/`
- **Kho 500,000+ Vector SVG miễn phí:** `https://www.svgrepo.com/`
- **Kho Minh họa Vector phẳng (Illustrations):** `https://undraw.co/illustrations` & `https://storyset.com/`
- **Kho Bản đồ Quốc gia / Thế giới chuẩn SVG:** `https://simplemaps.com/resources/svg-maps`
- **Kho Hoạt hình Vector JSON (Lottie):** `https://lottiefiles.com/`

---

## 3. Hệ Thống 7 Phong Cách Đồ Họa SVG (Multi-Style Engine trên HyperFrames)

### Style 1: MinutePhysics (Whiteboard / Chalkboard Sketch)
- **Đặc trưng**: Bảng đen (`#141820`) hoặc giấy trắng, nét vẽ tay nguệch ngoạc, người que (stickman).
- **Kỹ thuật trên HyperFrames**: Dùng `rough.svg(svgElement)` của `roughjs` (với `seed` cố định) để sinh các thẻ `<path>`, sau đó dùng GSAP animate `strokeDashoffset` từ `getTotalLength()` về `0` khớp theo giây giọng đọc.
- **Màu sắc**: Bảng đen (`#141820`), phấn trắng (`#ffffff`), vàng (`#ffd166`), xanh phấn (`#4ea8de`), đỏ cam (`#ff6b6b`).

### Style 2: The Infographics Show (Flat Vector + D3 Chart + Camera Zoom/Pan)
- **Đặc trưng**: Đại cảnh chia nhiều khu vực (zones), camera di chuyển liên tục qua từng cụm thông tin, icon màu phẳng.
- **Kỹ thuật trên HyperFrames**:
  - Đặt một thẻ `<div id="camera-rig">` bọc toàn bộ canvas và dùng `tl.to("#camera-rig", { x: ..., y: ..., scale: ..., duration: 0.9, ease: "power3.inOut" }, time)` để làm Camera Zoom/Pan.
  - Dùng `<iconify-icon>` cho các thẻ thông tin và `d3.js` + GSAP `tl.fromTo(".bar", { scaleY: 0 }, { scaleY: 1, stagger: 0.12 })` cho biểu đồ.

### Style 3: Kurzgesagt – In a Nutshell (Vibrant Vector & Organic Morphing)
- **Đặc trưng**: Đồ họa vector mượt mà, màu sắc `<radialGradient>` rực rỡ, hiệu ứng biến hình hữu cơ (morphing) giữa tế bào, vi khuẩn, thiên thể.
- **Kỹ thuật trên HyperFrames**: Kết hợp `flubber.interpolate(pathA, pathB)` với `gsap.timeline({ paused: true })` `onUpdate` để biến đổi hình dạng mượt mà.
- **Màu sắc**: Không gian tím thẫm (`#090621`), Neon Magenta (`#f72585`), Cyan Blue (`#4cc9f0`), Sun Gold (`#ffb703`).

### Style 4: STEM & Math Visualization (Phong cách 3Blue1Brown)
- **Đặc trưng**: Lưới tọa độ tối (Dark Coordinate Grid `#050508`), các đường cong đồ thị hàm số tự vẽ bằng nét phát sáng, công thức toán học biến đổi.
- **Kỹ thuật trên HyperFrames**: Vẽ đường cong toán học vào `<path>` và dùng GSAP animate `strokeDashoffset` kết hợp công thức KaTeX/SVG.

### Style 5: Cyberpunk / Sci-fi HUD Telemetry (Giao diện Công nghệ Cao)
- **Đặc trưng**: Giao diện giả lập (FUI), radar quét 360 độ, đường viền góc vát công nghệ, đèn tín hiệu nhấp nháy, dữ liệu telemetry.
- **Kỹ thuật trên HyperFrames**: Dùng `<filter id="hud-glow">` (`feDropShadow`), dùng GSAP `tl.to("#radar-sweep", { rotation: 360, transformOrigin: "50% 50%", repeat: -1, ease: "none" }, 0)`.
- **Màu sắc**: Cyber Blue (`#00f0ff`), Toxic Green (`#39ff14`), Cyberpunk Yellow (`#fee715`), Dark Matrix (`#020b14`).

### Style 6: Isometric 3D Vector (Kiến Trúc Hệ Thống & Tech Stack)
- **Đặc trưng**: Phối cảnh trục đo 30 độ (Isometric), khối hộp 3D vector (`<polygon>` 3 mặt Top/Left/Right), hạt dữ liệu chạy dọc đường ống giữa các node bằng GSAP `stagger`.

### Style 7: Kinetic Typography & Paper Collage (Phong cách Vox / Johnny Harris)
- **Đặc trưng**: Nền giấy báo (`#f4f1ea`), chữ lớn giật nảy theo từng từ khóa bằng GSAP `tl.from(".word", { scale: 0, rotation: -6, ease: "back.out(2)", stagger: 0.15 })`, vệt bút dạ quang (`#fef08a`) quẹt ngang dưới chân chữ.
