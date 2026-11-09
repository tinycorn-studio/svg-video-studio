# 🎬 SVG Video Studio — Nhánh `hyperframes` (HTML + SVG + GSAP Engine)

<p align="center">
  <b>Multi-Style SVG Video Generation Studio powered by <a href="https://github.com/heygen-com/hyperframes">HyperFrames</a> & AI Agents</b>
</p>

> 📌 **Cấu trúc Nhánh (Branches) của Repository:**
> - **`hyperframes` *(Nhánh hiện tại)***: Sử dụng **HyperFrames Engine** (`HTML + CSS + SVG + GSAP Paused Timeline`) — Không cần bước bundle React, chạy trực tiếp từ file `index.html`.
> - **`main`**: Sử dụng **Remotion Engine** (`React + TypeScript + useCurrentFrame`).

---

## 🚀 Khởi Chạy Nhanh (Quick Start)

```powershell
# 1. Clone nhánh hyperframes về máy mới
git clone -b hyperframes https://github.com/tinycorn-studio/svg-video-studio.git
cd svg-video-studio

# 2. Cài đặt các gói phụ thuộc
npm install

# 3. Mở trình xem trước trực tiếp (HyperFrames Preview Server)
npm run dev
# hoặc: npx hyperframes preview

# 4. Kiểm tra tính hợp lệ của Composition & Timeline
npm run hf:check

# 5. Xuất ra file video MP4 chuẩn từng khung hình
npm run hf:render
```

---

## 🎨 7 Phong Cách Đồ Họa SVG Tích Hợp Sẵn (`.agents/rules/youtube-svg-styles.md`)

Nhánh này đã được cấu hình sẵn bộ quy chuẩn cho AI Agent để dựng video theo **7 phong cách đồ họa YouTube nổi tiếng**, điều khiển bằng `gsap.timeline({ paused: true })` gắn vào `window.__timelines`:

| STT | Phong Cách Đồ Họa | Kênh YouTube Đại Diện | Công Nghệ Cốt Lõi Trên HyperFrames |
| :-: | :--- | :--- | :--- |
| **1** | **MinutePhysics** *(Chalkboard Sketch)* | *MinutePhysics*, *RSA Animate* | `rough.svg()` (`roughjs`) + GSAP `strokeDashoffset` |
| **2** | **The Infographics Show** *(Flat Vector + D3)* | *The Infographics Show*, *PolyMars* | `<iconify-icon>` + `d3.js` + GSAP `#camera-rig` Zoom/Pan |
| **3** | **Kurzgesagt** *(Vibrant Vector & Morphing)* | *Kurzgesagt – In a Nutshell* | `<radialGradient>` đa tầng + `flubber` morphing |
| **4** | **STEM & Math Visualization** | *3Blue1Brown*, *Numberphile* | Dark Coordinate Grid + Đồ thị hàm số SVG + KaTeX |
| **5** | **Cyberpunk / Sci-Fi HUD Telemetry** | Kênh Công nghệ, AI, Quân sự | `<filter id="hud-glow">` + Radar xoay 360° bằng GSAP |
| **6** | **Isometric 3D Vector** | System Design, Cloud, DevOps | Khối hộp `<polygon>` trục đo $30^\circ$ + luồng dữ liệu |
| **7** | **Kinetic Typography & Paper Collage** | *Vox*, *Johnny Harris* | Nền giấy báo `#f4f1ea` + chữ lớn nảy `ease: "back.out(2)"` |

---

## 🤖 9 Bộ AI Skills Chính Chủ Của HyperFrames (`.agents/skills/`)

Toàn bộ 9 bộ Skill chính chủ từ [`heygen-com/hyperframes`](https://github.com/heygen-com/hyperframes) đã được cài sẵn trong `.agents/skills/`:
- **`hyperframes`**: Quy chuẩn HTML composition, GSAP seekable timeline, phụ đề và bố cục.
- **`hyperframes-cli`**: Các lệnh kiểm tra, chụp frame, preview và render.
- **`hyperframes-registry`**: Kho hơn 450+ blocks & components dựng sẵn (biểu đồ, bản đồ, chuyển cảnh).
- **`media-use`**: Xử lý voiceover, nhạc nền, SFX và màu sắc.
- **`remotion-to-hyperframes`**: Chuyển đổi code video từ nhánh Remotion (`main`) sang HyperFrames.
- **`style-sampling`**, **`reverse-any-video`**, **`slideshow`**, **`figma`**.

---

## 📦 Tầng Tài Nguyên Icon & SVG Hỗ Trợ (`Shared SVG Asset Layer`)

- **Tra cứu 200,000+ Iconify Icons (`<iconify-icon icon="...">`):** [https://icones.js.org/](https://icones.js.org/)
  - Icon màu phẳng: `twemoji:*`, `noto:*`, `flat-color-icons:*`
  - Cờ quốc gia: `circle-flags:*`, `flag:*`
  - Logo công nghệ / AI: `logos:*`, `simple-icons:*`, `devicon:*`
  - Khoa học / Quân sự / Y tế: `game-icons:*`, `healthicons:*`
  - Icon nét mảnh: `lucide:*`, `tabler:*`, `mdi:*`, `ph:*`
- **Kho tải file `.svg` & Lottie ngoài (`public/svg/`):** [SVGRepo](https://www.svgrepo.com/) • [unDraw](https://undraw.co/illustrations) • [SimpleMaps](https://simplemaps.com/resources/svg-maps) • [LottieFiles](https://lottiefiles.com/)

📄 Xem chi tiết toàn bộ danh mục thư viện và hướng dẫn khôi phục tại **[DOCS.md](./DOCS.md)**.
