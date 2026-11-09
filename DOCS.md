# Tài Liệu Dự Án SVG Video Engine — Nhánh `hyperframes` (`DOCS.md`)

Dự án này được chia thành **2 nhánh (branches) độc lập** cho 2 Engine dựng video mạnh nhất hiện nay, dùng chung hệ thống **7 Phong cách Đồ họa SVG** và **Tầng Tài nguyên Icon/SVG Hỗ trợ**:
- **Nhánh `main`:** Dành cho **Remotion** (`React + TypeScript + useCurrentFrame`).
- **Nhánh `hyperframes` *(Nhánh hiện tại)*:** Dành cho **HyperFrames** (`HTML + SVG + GSAP Paused Timeline`).

---

## 1. Hướng Dẫn Chuyển Đổi Nhánh & Cài Đặt Lại Trên Máy Mới

```powershell
# Chuyển sang nhánh HyperFrames (HTML + GSAP)
git checkout hyperframes
npm install

# Hoặc chuyển về nhánh Remotion (React + TypeScript)
git checkout main
npm install
```

### Nếu muốn cài đặt bộ HyperFrames & Skills từ đầu trên một dự án mới:
```powershell
# 1. Cài đặt HyperFrames CLI và các thư viện SVG Nhóm 3
npm install hyperframes gsap roughjs flubber d3 animejs vivus

# 2. Kéo trọn bộ 9 AI Skills chính chủ của HeyGen HyperFrames vào .agents/skills
git clone --depth 1 https://github.com/heygen-com/hyperframes.git .tmp-hf
New-Item -ItemType Directory -Force -Path .agents\skills
Copy-Item -Recurse -Force .tmp-hf\skills\* .agents\skills\
Remove-Item -Recurse -Force .tmp-hf
```

---

## 2. Hệ Thống 9 AI Skills Chính Chủ Của HyperFrames (`.agents/skills/`)

Trên nhánh `hyperframes`, thư mục `.agents/skills/` đã được thay thế bằng **9 bộ Skill chính chủ từ `heygen-com/hyperframes`**:

| Tên Skill | Công dụng cho AI Agent |
| :--- | :--- |
| **`hyperframes`** | Skill cốt lõi dạy AI viết HTML composition, kết nối GSAP timeline (`window.__timelines`), âm thanh, phụ đề và bố cục. |
| **`hyperframes-cli`** | Hướng dẫn AI dùng CLI để kiểm tra lỗi (`check`), chụp frame kiểm thử, xem trước (`preview`) và xuất MP4 (`render`). |
| **`hyperframes-registry`** | Kết nối kho hơn **450+ blocks & components** dựng sẵn của HyperFrames (chuyển cảnh, biểu đồ, bản đồ, hiệu ứng chữ). |
| **`media-use`** | Xử lý âm thanh, giọng đọc (voiceover), hiệu ứng âm thanh (SFX) và tối ưu màu sắc hình ảnh. |
| **`remotion-to-hyperframes`** | Chuyên chuyển đổi code từ nhánh Remotion (`main`) sang chuẩn HTML + GSAP của HyperFrames. |
| **`style-sampling`** | Xây dựng video theo các mẫu Explainer chuyên nghiệp (Collage, Finance, Animated Science, 3D). |
| **`reverse-any-video`** | Phân tích một video mẫu bất kỳ để dựng lại thành project HyperFrames. |
| **`slideshow` & `figma`** | Chuyển thiết kế Figma hoặc slide thuyết trình sang video HTML. |

---

## 3. Hệ Thống 7 Phong Cách Đồ Họa SVG & Kho Tài Nguyên (`.agents/rules/youtube-svg-styles.md`)

File `.agents/rules/youtube-svg-styles.md` trên nhánh này đã được tinh chỉnh riêng cho **HyperFrames (HTML + SVG + GSAP)**:

### A. Cơ chế điều khiển thời gian trên HyperFrames
- Mọi chuyển động SVG được đặt trong `const tl = gsap.timeline({ paused: true })` và gắn vào `window.__timelines.<compositionId> = tl`.
- Hiệu ứng tự vẽ nét (Line Drawing): Dùng `path.getTotalLength()` + GSAP animate `strokeDashoffset`.
- Hiệu ứng biến hình (Morphing): Dùng `flubber.interpolate(pathA, pathB)` trong hàm `onUpdate` của GSAP.

### B. 7 Phong cách Đồ họa SVG được hỗ trợ
1. **Style 1: MinutePhysics (Chalkboard Sketch)**: `rough.svg(svgEl)` + GSAP `strokeDashoffset` vẽ nét tay trên bảng đen `#141820`.
2. **Style 2: The Infographics Show (Flat Vector + D3 + Camera Zoom/Pan)**: Thẻ `<iconify-icon>` + `d3.js` + GSAP điều khiển `#camera-rig` (`scale`, `x`, `y`).
3. **Style 3: Kurzgesagt (Vibrant Vector & Organic Morphing)**: `<radialGradient>` nhiều tầng + `flubber` morphing.
4. **Style 4: STEM & Math Visualization (3Blue1Brown)**: Lưới tọa độ tối `#050508` + đồ thị hàm số toán học.
5. **Style 5: Cyberpunk / Sci-fi HUD Telemetry**: `<filter id="hud-glow">` + Radar xoay 360° bằng GSAP.
6. **Style 6: Isometric 3D Vector**: Khối hộp 3D `<polygon>` trục đo $30^\circ$.
7. **Style 7: Kinetic Typography & Paper Collage (Vox)**: Nền giấy báo `#f4f1ea` + chữ lớn nảy bằng GSAP `ease: "back.out(2)"`.

### C. Bảng Mã Kho Tài Nguyên Iconify (`<iconify-icon icon="...">`)
- **Tra cứu 200,000+ icon:** [https://icones.js.org/](https://icones.js.org/)
- **Icon màu phẳng:** `twemoji:*`, `noto:*`, `flat-color-icons:*`
- **Cờ quốc gia:** `circle-flags:*`, `flag:*`
- **Logo công nghệ / AI:** `logos:*`, `simple-icons:*`, `devicon:*`
- **Khoa học / Quân sự / Y tế:** `game-icons:*`, `healthicons:*`
- **Icon nét mảnh:** `lucide:*`, `tabler:*`, `mdi:*`, `ph:*`
- **Kho tải file `.svg` & Lottie ngoài (`public/svg/`):** [svgrepo.com](https://www.svgrepo.com/), [undraw.co](https://undraw.co/illustrations), [simplemaps.com](https://simplemaps.com/resources/svg-maps), [lottiefiles.com](https://lottiefiles.com/).

---

## 4. Các Lệnh Thường Dùng Trên Nhánh `hyperframes`

```powershell
# 1. Xem trước video HTML+SVG trực tiếp trên trình duyệt (Live Reload)
npm run dev
# (hoặc: npx hyperframes preview)

# 2. Kiểm tra tính hợp lệ của Composition & Timeline
npm run hf:check
# (hoặc: npx hyperframes check)

# 3. Xuất file HTML+SVG+GSAP (index.html) ra video MP4
npm run hf:render
# (hoặc: npx hyperframes render)
```
