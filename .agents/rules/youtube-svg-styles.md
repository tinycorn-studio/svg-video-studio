---
trigger: always_on
description: Quy chuẩn dựng video YouTube bằng SVG với 7 phong cách đồ họa và Tầng Tài Nguyên SVG/Icon Hỗ Trợ (Shared SVG Asset Layer) trong Remotion.
---

# Quy Chuẩn Dựng Video YouTube Bằng SVG Đa Phong Cách (Remotion)

Khi người dùng yêu cầu tạo video, hoạt hình SVG, hoặc cảnh quay (scene) trong dự án này, hãy tuân thủ nghiêm ngặt các nguyên tắc, quy tắc chọn tài nguyên SVG và bộ 7 phong cách sau:

---

## 1. Nguyên tắc Cốt lõi của Remotion (Bắt buộc)
- **Tuyệt đối không dùng CSS `transition`, `animation` hoặc `setTimeout` / `requestAnimationFrame`**. Mọi chuyển động phải được tính toán thuần túy từ `const frame = useCurrentFrame()` và `const { fps } = useVideoConfig()`.
- **Thư viện Animation Nhóm 3**:
  - **`flubber`**: Dùng `flubber.interpolate(pathA, pathB)(progress)` với `progress` (0 -> 1) lấy từ `interpolate(frame, ...)`.
  - **`@remotion/paths`**: Dùng `evolvePath(progress, pathD)` để tạo hiệu ứng tự vẽ nét (`strokeDasharray` / `strokeDashoffset`).
  - **`gsap` / `animejs` / `vivus`**: Luôn khởi tạo ở chế độ `paused: true` và cập nhật trạng thái theo từng frame bằng `.seek(frame / fps)`.

---

## 2. Tầng Tài Nguyên SVG Hỗ Trợ & Quy Tắc Khi Nào Cần Sử Dụng (Shared SVG Asset Layer)

Kho thư viện SVG đóng vai trò là **Tầng Tài Nguyên Hỗ Trợ Dùng Chung cho cả 7 Style**. AI phải tuân thủ quy tắc phân loại sau để quyết định khi nào tự viết code SVG và khi nào gọi thư viện:

### A. Khi nào AI tự viết code SVG chay?
- Khi vẽ **hình học cơ bản, sơ đồ khối (flowchart), đường nối, mũi tên, lưới tọa độ, quỹ đạo, biểu đồ số liệu (`d3`), khung giao diện HUD, hoặc người que (`RoughStickman`)**.

### B. Khi nào AI BẮT BUỘC phải gọi Kho Icon & Tài nguyên SVG Hỗ trợ?
- **CẤM AI tự gõ tọa độ `<path>` hoặc `<polygon>` thủ công để vẽ các vật thể thực tế phức tạp** (như: *con vật, bộ não, xe cộ, vũ khí, cờ quốc gia, logo thương hiệu, tòa nhà, thực phẩm, thiết bị y tế*). Tự vẽ chay sẽ làm hình bị méo mó, thiếu chuyên nghiệp.
- Thay vào đó, hãy sử dụng **`<Icon icon="prefix:name" />` từ `@iconify/react`** theo bảng bộ sưu tập chuẩn dưới đây:

| Chủ đề Vật thể cần hiển thị | Bộ Prefix `@iconify/react` khuyên dùng | Ví dụ mã Icon (`icon="..."`) |
| :--- | :--- | :--- |
| **Icon Màu Phẳng Đa Dụng (Đẹp cho Style 2, 3, 7)** | `twemoji:*`, `noto:*`, `flat-color-icons:*` | `twemoji:rocket`, `noto:brain`, `flat-color-icons:money-transfer` |
| **Cờ Quốc Gia & Địa Lý** | `circle-flags:*`, `flag:*` | `circle-flags:vn`, `circle-flags:us`, `circle-flags:jp` |
| **Logo Công Nghệ, AI, Thương Hiệu** | `logos:*`, `simple-icons:*`, `devicon:*` | `logos:openai-icon`, `logos:youtube-icon`, `logos:bitcoin` |
| **Khoa Học, Quân Sự, Lịch Sử, Game (Nét Vector)** | `game-icons:*`, `healthicons:*` | `game-icons:nuclear-bomb`, `game-icons:submarine`, `healthicons:virus` |
| **Icon Nét Mảnh Tối Giản (Đẹp cho Style 1, 4, 5, 6)** | `lucide:*`, `tabler:*`, `mdi:*`, `ph:*` | `lucide:cpu`, `tabler:satellite`, `mdi:atom`, `ph:planet-duotone` |

### C. Cách biến đổi Icon/SVG từ Thư viện để khớp với từng Style:
1. **Trong Style 1 (MinutePhysics):** Dùng bộ icon nét đơn (`lucide:*`, `tabler:*`) màu phấn trắng/vàng trên nền bảng đen, hoặc truyền `<path>` của SVG vào `evolvePath()` để làm hiệu ứng tự vẽ nét.
2. **Trong Style 2 (Infographics) & Style 3 (Kurzgesagt):** Dùng trực tiếp các bộ icon đa sắc (`twemoji:*`, `noto:*`, `flat-color-icons:*`) kết hợp hiệu ứng nảy `spring()`.
3. **Trong Style 5 (Sci-Fi HUD):** Dùng bộ `game-icons:*`, `mdi:*` hoặc `lucide:*` với màu `#00f0ff` / `#39ff14` và đặt trong bộ lọc `<HudGlowFilter />` để biến icon thành hình chiếu Hologram phát sáng.
4. **Trong Style 7 (Kinetic Vox Collage):** Đặt icon hoặc file SVG từ `public/svg/` lên trên một tấm thẻ cắt giấy trắng có viền đậm và bóng đổ cứng (`drop-shadow(8px 8px 0px #0f172a)`).

### D. Nguồn Tra Cứu & Tải File SVG / Lottie Phức Tạp (Đặt vào `public/svg/`)
Khi cần bản đồ chi tiết, cảnh minh họa lớn hoặc hoạt hình nhân vật cử động:
- **Tra cứu tên 200,000+ Iconify Icons:** `https://icones.js.org/`
- **Kho 500,000+ Vector SVG miễn phí:** `https://www.svgrepo.com/`
- **Kho Minh họa Vector phẳng (Illustrations):** `https://undraw.co/illustrations` & `https://storyset.com/`
- **Kho Bản đồ Quốc gia / Thế giới chuẩn SVG:** `https://simplemaps.com/resources/svg-maps`
- **Kho Hoạt hình Vector JSON (`@remotion/lottie`):** `https://lottiefiles.com/`

---

## 3. Hệ Thống 7 Phong Cách Đồ Họa SVG (Multi-Style Engine)

### Style 1: MinutePhysics (Whiteboard / Chalkboard Sketch)
- **Đặc trưng**: Bảng đen hoặc giấy trắng, nét vẽ tay nguệch ngoạc, người que (stickman), hiệu ứng rung nét (Line Boil).
- **Thành phần sử dụng**: `src/styles/minute-physics/RoughElements.tsx`
  - `<RoughStickman />`: Hỗ trợ các pose `"stand"`, `"point-right"`, `"wave"`, `"think"`.
  - `<RoughBox />`, `<RoughCircle />`, `<RoughArrow />`, `<RoughLine />`, `<RoughCurve />`: Sinh bằng `roughjs` và tự vẽ nét dần bằng `evolvePath`.
- **Màu sắc**: Bảng đen (`#141820`), phấn trắng (`#ffffff`), vàng (`#ffd166`), xanh phấn (`#4ea8de`), đỏ cam (`#ff6b6b`).

### Style 2: The Infographics Show (Flat Vector + D3 Chart + Camera Zoom/Pan)
- **Đặc trưng**: Đại cảnh chia nhiều khu vực (zones), camera di chuyển liên tục qua từng cụm thông tin, icon màu phẳng.
- **Thành phần sử dụng**: `src/styles/infographics/InfographicsElements.tsx`
  - `<CameraRig keyframes={[...]} />`: Zoom In / Pan ngang / Zoom Out mượt mà theo từng giây giọng đọc.
  - `<FlatIconCard />`: Kết nối hơn 200,000+ icon từ `@iconify/react` (`flat-color-icons:*`, `twemoji:*`, `lucide:*`).
  - `<AnimatedBarChart />` & `d3`: Biểu đồ cột/tròn SVG mọc lên sinh động kèm số đếm tăng dần.
- **Màu sắc**: Nền Dark Slate (`#0b1120` hoặc `#0f172a`), viền Neon Cyan (`#38bdf8`), Gold (`#facc15`), Red Alert (`#ef4444`).

### Style 3: Kurzgesagt – In a Nutshell (Vibrant Vector & Organic Morphing)
- **Đặc trưng**: Đồ họa vector mượt mà, màu sắc gradient rực rỡ, hiệu ứng biến hình hình học (morphing) giữa tế bào, vi khuẩn, thiên thể.
- **Thành phần sử dụng**: `src/styles/kurzgesagt/KurzgesagtElements.tsx`
  - `<MorphingPath pathA={...} pathB={...} />`: Biến hình hữu cơ mượt mà bằng `flubber`.
  - `<KurzgesagtPlanet />`: Hành tinh/tế bào với nhiều tầng hào quang khí quyển (Atmosphere layers) phát sáng mềm mại và bóng khuyết (crescent shadow).
- **Màu sắc**: Không gian tím thẫm (`#0b092b`), Neon Magenta (`#f72585`), Cyan Blue (`#4cc9f0`), Sun Gold (`#ffb703`).

### Style 4: STEM & Math Visualization (Phong cách 3Blue1Brown)
- **Đặc trưng**: Lưới tọa độ tối (Dark Coordinate Grid), các đường cong đồ thị hàm số tự vẽ bằng nét phát sáng, công thức toán học/khoa học biến đổi.
- **Kỹ thuật SVG**:
  - Dùng thẻ `<svg>` với lưới ô vuông bán trong suốt (`rgba(255,255,255,0.08)`).
  - Sử dụng `@remotion/paths` (`evolvePath`) để vẽ các đường cong giải thuật (sin, cos, bezier, phân phối xác suất).
  - Tích hợp công thức qua SVG text hoặc `@remotion/google-fonts`.
- **Màu sắc**: Nền đen tuyền (`#050508`), đường hàm số vàng chanh (`#ffe66d`), xanh da trời (`#4ea8de`), tím huỳnh quang (`#f72585`).

### Style 5: Cyberpunk / Sci-fi HUD Telemetry (Giao diện Công nghệ Cao)
- **Đặc trưng**: Giao diện giả lập (FUI), radar quét 360 độ, đường viền góc vát công nghệ, đèn tín hiệu nhấp nháy, dữ liệu telemetry.
- **Thành phần sử dụng**: `src/styles/scifi-hud/SciFiHudElements.tsx`
  - `<HudGlowFilter />`: Bộ lọc SVG `<filter>` tạo quầng sáng neon chân thực (`feDropShadow`).
  - `<RadarSweep />`: Vòng tròn radar quét liên tục kèm tâm tọa độ phát sáng.
  - `<TechBox />`: Hộp dữ liệu góc vát công nghệ (angled tech corners) có đèn status nhấp nháy theo nhịp frame.
- **Màu sắc**: Cyber Blue (`#00f0ff`), Toxic Green (`#39ff14`), Cyberpunk Yellow (`#fee715`), Dark Matrix (`#020b14`).

### Style 6: Isometric 3D Vector (Kiến Trúc Hệ Thống & Tech Stack)
- **Đặc trưng**: Phối cảnh trục đo 30 độ (Isometric), khối hộp 3D vector, mô hình máy chủ, mạng lưới dữ liệu chạy giữa các node.
- **Kỹ thuật SVG**:
  - Tính toán tọa độ đỉnh 3 mặt `Top / Left / Right` của khối lập phương Isometric (`Math.cos(Math.PI / 6)` và `Math.sin(Math.PI / 6)`).
  - Hạt dữ liệu (data packets) di chuyển dọc theo các trục `X, Y, Z` bằng `interpolate(frame, ...)`.
- **Màu sắc**: Màu pastel công nghệ cao (`#3b82f6`, `#8b5cf6`, `#10b981`), bóng tối đổ theo mặt bên để tạo chiều sâu 3D.

### Style 7: Kinetic Typography & Paper Collage (Phong cách Vox / Johnny Harris)
- **Đặc trưng**: Chữ lớn giật nảy đồng bộ theo từng từ khóa của giọng đọc, khung viền cắt giấy (paper-cut) hoặc vệt highlight dạ quang.
- **Kỹ thuật SVG**:
  - Sử dụng `@remotion/captions` kết hợp `spring()` với độ nảy cao (`damping: 10, stiffness: 200`) để chữ bung ra từng từ.
  - Vệt highlight màu vàng dạ quang (`#fef08a`) hoặc đỏ (`#ef4444`) vẽ lướt qua dưới chân từ khóa quan trọng.
