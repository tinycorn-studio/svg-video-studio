# Tài Liệu Dự Án Remotion SVG Video (`DOCS.md`)

Tài liệu này ghi chú lại **toàn bộ cấu hình, thư viện, AI Skills/Rules và hướng dẫn cài đặt lại** của dự án để khi bạn đẩy lên Git và kéo về bất kỳ máy tính mới nào cũng có thể kiểm tra và khôi phục 100% môi trường chỉ trong vài phút.

---

## 1. Hướng Dẫn Kéo Về Máy Mới & Cài Đặt Lại (Quick Restore)

### Yêu cầu hệ thống trên máy mới
- **Node.js**: Phiên bản `>= 20.19.0` (khuyên dùng Node 22 LTS hoặc mới hơn).
- **Git**: Để clone dự án.
- *(Không cần cài đặt FFmpeg hay trình duyệt rời vì `@remotion/cli` sẽ tự động tải bản rút gọn ngay khi chạy).*

### Cách 1: Khi bạn đã đẩy dự án này lên Git và clone về máy mới
Toàn bộ danh sách thư viện đã nằm trong `package.json` và bộ AI Skills/Rules đã nằm trong `.agents/`. Bạn chỉ cần chạy:

```powershell
git clone <link-repo-cua-ban> RemotionVideo
cd RemotionVideo
npm install
npm run dev
```

### Cách 2: Lệnh cài lại từ con số 0 (Nếu muốn tạo một dự án mới tinh khác)
Nếu sau này bạn muốn dựng một repo mới tương tự từ đầu, chạy lần lượt các lệnh sau:

```powershell
# 1. Khởi tạo project Remotion + TailwindCSS
npx --yes create-video@latest --yes --hello-world --tailwind TenDuAn
cd TenDuAn

# 2. Cài đặt bộ gói mở rộng chính chủ của Remotion (SVG, Lottie, Transitions, Captions, Fonts)
npx remotion add @remotion/paths @remotion/shapes @remotion/lottie @remotion/transitions @remotion/captions @remotion/google-fonts

# 3. Cài đặt bộ thư viện SVG Animation (Nhóm 3) + Cách 1 (MinutePhysics) + Cách 2 (Infographics Show)
npm install roughjs flubber @types/flubber animejs @types/animejs vivus @types/vivus gsap lucide-react @iconify/react d3 @types/d3

# 4. Kéo bộ AI Skills chính chủ của Remotion vào .agents/skills
git clone --depth 1 https://github.com/remotion-dev/skills.git .tmp-skills
New-Item -ItemType Directory -Force -Path .agents\skills
Copy-Item -Recurse -Force .tmp-skills\skills\* .agents\skills\
Remove-Item -Recurse -Force .tmp-skills
```

---

## 2. Danh Sách Toàn Bộ Thư Viện Đang Có Trong Dự Án

### A. Nhóm Lõi & Bổ Trợ Của Remotion (`@remotion/*`)
| Thư viện | Phiên bản | Công dụng chính |
| :--- | :--- | :--- |
| `remotion` & `@remotion/cli` | `4.0.541` | Nhân lõi dựng video bằng React (`useCurrentFrame`, `spring`, `interpolate`, `Sequence`) + Remotion Studio & FFmpeg Renderer. |
| `@remotion/paths` | `4.0.541` | Xử lý đường cong SVG: tự vẽ nét chữ/hình (`evolvePath`), lấy tọa độ dọc theo đường cong (`getPointAtLength`), nối/biến đổi path. |
| `@remotion/shapes` | `4.0.541` | Tạo nhanh các hình học vector SVG chuẩn (`<Star />`, `<Polygon />`, `<Circle />`, `<Triangle />`, `<Heart />`, `<Pie />`). |
| `@remotion/lottie` | `4.0.541` | Nhúng và đồng bộ từng frame các file hoạt hình JSON xuất từ Adobe After Effects / LottieFiles. |
| `@remotion/transitions` | `4.0.541` | Hiệu ứng chuyển cảnh chuyên nghiệp giữa các Scene (`fade`, `slide`, `wipe`, `flip`). |
| `@remotion/captions` | `4.0.541` | Đồng bộ phụ đề / kịch bản khớp theo từng giây giọng đọc (Voiceover / TikTok-style captions). |
| `@remotion/google-fonts` | `4.0.541` | Tải tự động bất kỳ font chữ nào từ Google Fonts (font viết tay cho Style 1, font hiện đại cho Style 2). |
| `@remotion/tailwind-v4` | `4.0.541` | Tích hợp TailwindCSS v4 để dàn trang nhanh. |

### B. Nhóm Thư Viện Chuyên Dụng Cho Cách 1 (Phong cách *MinutePhysics*)
| Thư viện | Công dụng trong dự án |
| :--- | :--- |
| **`roughjs`** | Chuyển mọi hình vẽ (hộp, mũi tên, vòng tròn, người que) thành các đường `<path>` SVG có nét vẽ tay phác thảo (sketchy/hand-drawn). Kết hợp với `evolvePath` của `@remotion/paths` để tạo hiệu ứng bàn tay đang vẽ từng nét theo giọng đọc. |

### C. Nhóm Thư Viện Chuyên Dụng Cho Cách 2 (Phong cách *The Infographics Show*)
| Thư viện | Công dụng trong dự án |
| :--- | :--- |
| **`@iconify/react`** | Kết nối trực tiếp kho hơn **200,000+ icon SVG phẳng & màu** (bao gồm `flat-color-icons`, `twemoji`, `noto`, `fluent`, `tabler`, `mdi`...) chỉ bằng tên chuỗi mà không cần tải file thủ công. |
| **`lucide-react`** | Bộ icon nét phẳng tối giản, đồng bộ cao cho các sơ đồ công nghệ & UI. |
| **`d3` (`@types/d3`)** | Tính toán tỷ lệ (`scaleBand`, `scaleLinear`, `arc`, `line`) để vẽ biểu đồ cột, biểu đồ đường, biểu đồ tròn bằng SVG động. |

### D. Nhóm 3: Các Thư Viện Web SVG Animation Bổ Trợ
| Thư viện | Công dụng trong dự án |
| :--- | :--- |
| **`flubber` (`@types/flubber`)** | Nội suy và biến hình (morphing) mượt mà giữa 2 hình SVG bất kỳ dù khác số lượng đỉnh. |
| **`animejs` (`@types/animejs`)** | Điều khiển timeline, stagger (hiệu ứng lan tỏa nhiều phần tử SVG) và motion path. |
| **`gsap`** | Thư viện animation chuẩn công nghiệp, dùng kết hợp `.seek(frame / fps)` trong Remotion. |
| **`vivus` (`@types/vivus`)** | Hiệu ứng tự vẽ nét (hand-drawn stroke) cho các file SVG phức tạp. |

---

## 3. Hệ Thống 7 Phong Cách Đồ Họa SVG & Kho Tài Nguyên Hỗ Trợ (`.agents/rules/youtube-svg-styles.md`)

### A. 7 Phong Cách Đồ Họa Chủ Đạo (Multi-Style Engine)
Dự án đã được tích hợp bộ quy tắc **Multi-Style Graphic Engine**, cho phép AI tự động chọn đúng thành phần, bảng màu và thư viện tương ứng:

1. **Style 1: MinutePhysics (Chalkboard Sketch)**: `src/styles/minute-physics/RoughElements.tsx` (`<RoughStickman />`, `<RoughBox />`, `<RoughArrow />`, `roughjs` + `evolvePath`).
2. **Style 2: The Infographics Show (Flat Vector + D3 + Zoom/Pan)**: `src/styles/infographics/InfographicsElements.tsx` (`<CameraRig />`, `<FlatIconCard />`, `<AnimatedBarChart />`, `@iconify/react`).
3. **Style 3: Kurzgesagt (Organic Vector & Morphing)**: `src/styles/kurzgesagt/KurzgesagtElements.tsx` (`<MorphingPath />`, `<KurzgesagtPlanet />`, `flubber`).
4. **Style 4: STEM & Math Visualization (3Blue1Brown)**: Dark Grid, Glowing Parametric Curves, SVG LaTeX / Fira Code.
5. **Style 5: Cyberpunk / Sci-fi HUD Telemetry**: `src/styles/scifi-hud/SciFiHudElements.tsx` (`<HudGlowFilter />`, `<RadarSweep />`, `<TechBox />`).
6. **Style 6: Isometric 3D Vector**: Khối hộp Server/Cloud 3D giả lập trên lưới trục đo $30^\circ$.
7. **Style 7: Kinetic Typography & Paper Collage (Vox)**: Chữ to nảy theo từ khóa, vệt highlight dạ quang và viền rách kiểu dán giấy.

### B. Tầng Tài Nguyên SVG Hỗ Trợ Dùng Chung (Shared SVG Asset Layer)
Khi cần hiển thị các vật thể thực tế phức tạp (cờ quốc gia, logo, não bộ, xe cộ, vũ khí, y tế...), AI sẽ **không vẽ tay thô sơ** mà gọi trực tiếp từ kho **`@iconify/react`** hoặc lấy file từ `public/svg/`:

| Loại Tài Nguyên | Prefix trong `@iconify/react` hoặc Link tải ngoài | Ví dụ / Ghi chú |
| :--- | :--- | :--- |
| **Tra cứu 200,000+ Iconify** | [https://icones.js.org/](https://icones.js.org/) | Gõ từ khóa tiếng Anh để lấy mã `prefix:name` |
| **Icon Màu Phẳng (Style 2, 3, 7)** | `twemoji:*`, `noto:*`, `flat-color-icons:*` | `twemoji:rocket`, `noto:brain`, `flat-color-icons:idea` |
| **Cờ Các Quốc Gia** | `circle-flags:*`, `flag:*` | `circle-flags:vn`, `circle-flags:us`, `circle-flags:jp` |
| **Logo Công Nghệ / AI / Crypto** | `logos:*`, `simple-icons:*`, `devicon:*` | `logos:openai-icon`, `logos:youtube-icon`, `logos:bitcoin` |
| **Icon Quân Sự, Khoa Học, Y Tế** | `game-icons:*`, `healthicons:*` | `game-icons:nuclear-bomb`, `healthicons:virus` |
| **Icon Nét Mảnh (Style 1, 4, 5, 6)** | `lucide:*`, `tabler:*`, `mdi:*`, `ph:*` | `lucide:cpu`, `tabler:satellite`, `mdi:atom` |
| **Kho 500,000+ File SVG Mở** | [https://www.svgrepo.com/](https://www.svgrepo.com/) | Tải file `.svg` về `public/svg/` |
| **Kho Minh Họa Nhân Vật Phẳng** | [https://undraw.co/illustrations](https://undraw.co/illustrations) & [https://storyset.com/](https://storyset.com/) | Minh họa cảnh lớn dễ đổi màu theo bảng màu video |
| **Kho Bản Đồ Địa Lý SVG** | [https://simplemaps.com/resources/svg-maps](https://simplemaps.com/resources/svg-maps) | Bản đồ quốc gia/thế giới chia sẵn từng bang/tỉnh |
| **Kho Hoạt Hình Lottie JSON** | [https://lottiefiles.com/](https://lottiefiles.com/) | Chạy bằng `@remotion/lottie` cho hiệu ứng lửa, nổ, người đi bộ |

---

## 4. Hệ Thống AI Skills & Rules Đã Cài Đặt (`.agents/`)

Thư mục `.agents/` được lưu trực tiếp trong dự án để khi bạn push lên Git và kéo về máy khác, AI Agent sẽ tự động đọc và hiểu toàn bộ quy chuẩn:

1. **`.agents/rules/youtube-svg-styles.md` (Custom Rule luôn kích hoạt):**
   - Quy định chi tiết cả **7 phong cách đồ họa SVG**, cách dùng `useCurrentFrame()` chuẩn xác và cách tái sử dụng các Component có sẵn.
2. **`.agents/skills/remotion-*` (13 Bộ Skill chính chủ từ `remotion-dev/skills`):**
   - `remotion-best-practices`: Quy chuẩn cốt lõi khi lập trình video bằng Remotion.
   - `remotion-markup`: Cách dàn bố cục, SVG, CSS, Typography trong video.
   - `remotion-captions`: Cách làm phụ đề khớp giọng đọc.
   - `remotion-multimedia`: Cách xử lý Audio, Video, Image, Font.
   - `remotion-maps`: Cách làm bản đồ địa lý chuyển động (nếu cần làm video lịch sử/địa lý).
   - `remotion-render` & `remotion-studio`: Các lệnh xuất video và điều khiển Studio.

---

## 5. Cấu Trúc Thư Mục & Các Bản Demo Có Sẵn

```text
RemotionVideo/
├── .agents/
│   ├── rules/
│   │   └── youtube-svg-styles.md       # Rule hướng dẫn AI làm trọn bộ 7 phong cách đồ họa
│   └── skills/
│       └── remotion-*/                 # 13 bộ Skill chính chủ từ Remotion
├── src/
│   ├── Root.tsx                        # Đăng ký danh sách các Video (Compositions)
│   ├── styles/
│   │   ├── minute-physics/             # [Style 1: MinutePhysics]
│   │   │   ├── RoughElements.tsx       # <RoughStickman />, <RoughBox />, <RoughArrow />, <RoughCurve />
│   │   │   └── MoonDisappear15s.tsx    # Video mẫu 15s Style 1
│   │   ├── infographics/               # [Style 2: The Infographics Show]
│   │   │   ├── InfographicsElements.tsx# <CameraRig />, <FlatIconCard />, <AnimatedBarChart />
│   │   │   └── MoonDisappearInfographics15s.tsx # Video mẫu 15s Style 2
│   │   ├── kurzgesagt/                 # [Style 3: Kurzgesagt]
│   │   │   └── KurzgesagtElements.tsx  # <MorphingPath />, <KurzgesagtPlanet />
│   │   └── scifi-hud/                  # [Style 5: Sci-Fi HUD / Telemetry]
│   │       └── SciFiHudElements.tsx    # <HudGlowFilter />, <RadarSweep />, <TechBox />
│   └── HelloWorld/                     # Video mẫu mặc định của Remotion
├── DOCS.md                             # Tài liệu tổng hợp này
└── package.json
```

---

## 6. Các Lệnh Thường Dùng Hàng Ngày

```powershell
# 1. Mở giao diện Remotion Studio trên trình duyệt (http://localhost:3000)
npm run dev

# 2. Kiểm tra lỗi TypeScript & ESLint
npm run lint

# 3. Xuất video Cách 1 (MinutePhysics) ra file MP4
npx remotion render Style1-MinutePhysics out/minute-physics.mp4

# 4. Xuất video Cách 2 (The Infographics Show) ra file MP4
npx remotion render Style2-InfographicsShow out/infographics.mp4
```
