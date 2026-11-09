# Kế hoạch video: "Hội chứng Kessler" (60s, Kurzgesagt style)

- Composition: `Kessler-Syndrome-60s` · 1920×1080 · 30 fps · 1800 frames (60,0s) · Style 3 (Kurzgesagt).
- Chủ đề hot: rác vũ trụ + mega-constellation. ESA Space Environment Report 2026 (14/09/2026) và thống kê ESA cập nhật 02/11/2026.
- Giọng đọc: tiếng Việt. Dự án chưa có file thu âm → phụ đề đã khớp theo `CUES` trong `theme.ts` (giây tuyệt đối). Thêm `<Audio>` sau khi có VO.
- Phong cách: nền tím thẫm `#0b092b`, magenta `#f72585`, cyan `#4cc9f0`, vàng `#ffb703`; hình khối phẳng + gradient, hành tinh có hào quang, chuyển động nảy/ease-out, đồ vật là SVG do Gemini 3.8 Flash tạo (`public/svg/kessler/`).

## Số liệu & nguồn (đã kiểm chứng)

| Số liệu dùng trong video | Nguồn |
| :--- | :--- |
| ~15.800 vệ tinh đang hoạt động (cập nhật 02/11/2026) | ESA Space Environment Statistics (DISCOS) |
| 68.450 vật thể > 10 cm (mô hình, mốc 02/2026; gồm cả ~11.300 payload hoạt động) | ESA MASTER |
| 1,5 triệu mảnh 1–10 cm | ESA MASTER |
| ~10 payload phóng mỗi ngày; >300 lần phóng, >4.000 payload năm 2025 | ESA Space Environment Report 2026 |
| Chỉ số Space Environment Health Index: ~4 → 50 trong một năm (= 50× áp lực so với mức bền vững 2014) | ESA Space Environment Report 2026 |
| Mục tiêu Zero Debris 2030 | ESA Zero Debris Approach |
| Kessler 1978 (NASA); va chạm Iridium 33 × Cosmos 2251 ngày 10/02/2009 | Tài liệu công khai |
| 27.000 km/h ≈ 7,5 km/s; "≈ 10× viên đạn" | Làm tròn từ tốc độ quỹ đạo thấp so với đạn súng trường (~0,8–1 km/s) |

Cách nói an toàn: chỉ khẳng định "có thể" với hậu quả của Kessler (ESA: "potentially unusable"); không nói GPS bị mất vì GPS ở quỹ đạo trung (MEO), ngoài vùng LEO.

## Kịch bản & storyboard

| Cảnh | Thời gian | Lời | Hình |
| :--- | :--- | :--- | :--- |
| 1 Hook | 0–5,1s | "Ngay lúc này, hơn 15.000 vệ tinh đang bay trên đầu bạn. Nhưng chúng không cô đơn." | Trái Đất + các vòng quỹ đạo, chấm cyan sáng dần, bộ đếm 15.800; chấm magenta (rác) len vào. Zoom-out nhẹ. |
| 2 Quy mô | 5,1–14,2s | "Hơn 68.000 vật thể lớn hơn 10 cm. 1,5 triệu mảnh nhỏ hơn, từ 1 đến 10 cm. Tốc độ 27.000 km/h. Nhanh gấp 10 lần viên đạn." | Trái Đất trượt trái, 3 thẻ số đếm lên bên phải; vệt tốc độ quét ngang. |
| 3 Domino | 14,2–26,3s | "Năm 1978, nhà khoa học NASA Donald Kessler cảnh báo: một vụ va chạm tạo ra mảnh vỡ, mảnh vỡ gây ra va chạm mới. Một hiệu ứng domino không thể dừng lại." | Vệ tinh đâm mảnh vỡ → 6 → 12 vụ nổ tiếp theo; bộ đếm va chạm 1 → 7 → 19; camera lùi. |
| 4 Hậu quả | 26,3–37,4s | "Năm 2009, hai vệ tinh đâm nhau… Nếu chuỗi phản ứng vượt ngưỡng, quỹ đạo thấp có thể thành vùng cấm. Phóng tên lửa sẽ cực kỳ nguy hiểm." | Cong Trái Đất ở đáy; vụ va chạm 2009 → mảnh vỡ lan thành vỏ rác quanh quỹ đạo, viền đỏ; tên lửa phóng lên bị nổ. |
| 5 Dữ liệu | 37,4–48,5s | "Báo cáo ESA 2026: mỗi ngày ~10 vệ tinh mới. Chỉ số sức khỏe quỹ đạo nhảy từ 4 lên 50 chỉ trong một năm. Gấp 50 lần mức bền vững." | 10 vệ tinh bật lên lần lượt; 2 cột 4 vs 50 mọc lên, vạch "mức bền vững = 1", "×50" xung nhịp. |
| 6 Hy vọng | 48,5–60s | "Giải pháp: đưa vệ tinh hết hạn về khí quyển, chủ động thu gom rác. ESA đặt mục tiêu hạn chế tối đa rác mới vào năm 2030. Bầu trời không vô tận. Đừng biến nó thành bãi rác." | 2 khung minh họa (cháy khi tái nhập, tàu thu gom), "2030", rác biến mất khỏi quỹ đạo, câu chốt; fade-out. |

Chuyển cảnh: `fade` 12 frame (5 lần). Tổng = 1860 − 5×12 = 1800 frames.

## Kiến trúc mã

```
src/videos/kessler/
├── theme.ts              # màu, font (Be Vietnam Pro), độ dài cảnh, CUES phụ đề
├── parts.tsx             # Backdrop sao parallax, Sprite, Earth, StatCard, Tag
├── orbit.tsx             # OrbitField (chấm quay deterministic), Rings, fmt
├── Scene1Hook.tsx … Scene6Future.tsx
├── KesslerSyndrome60s.tsx # TransitionSeries + phụ đề + credit + fade-out
└── PLAN.md
public/svg/kessler/       # earth, satellite, starlink, rocket, rocket-stage, debris-1..4,
                          # burst, shockwave, collector, glow-dot (Gemini 3.8 Flash)
```

Quy tắc dự án được tuân thủ: không CSS transition/animation, mọi chuyển động từ `useCurrentFrame()`; hình phức tạp là file SVG trong `public/svg/`; xuất bằng `npx remotion render` đúng id.

## Xuất file

```powershell
npx remotion render Kessler-Syndrome-60s out/kessler-syndrome-60s.mp4 --codec h264 --crf 16
```
