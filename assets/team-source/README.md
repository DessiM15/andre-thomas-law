# Team headshot sources

Originals as supplied by the firm, kept so the crops in `public/team/` can be
redone without asking anyone to dig out the file again.

| File | Used for | Note |
| --- | --- | --- |
| `milagro-rodriguez-mejia.jpeg` | `public/team/milagro-rodriguez-mejia.webp` | 1086×1448 original. Cropped to 640×640 at +210+130, then scaled to 800. |
| `maria-hernandez-castillo.png` | `public/team/maria-hernandez-castillo.webp` | 1254×1254 original. Scaled to 800, no crop. |
| `nayla-mendez-signature.png` | `public/team/nayla-mendez.webp` | **Email signature, not a headshot.** The embedded photo is only 219×325, cut out and upscaled to 800. Soft. Replace with the original. |
| `marissa-lopez-signature.png` | `public/team/marissa-lopez.webp` | **Email signature, not a headshot.** The embedded photo is only 193×202, cut out and upscaled to 800. Softest of the six. Replace with the original. |
| `marie-hernandez-signature.png` | `public/team/marie-hernandez.webp` | **Email signature, not a headshot.** The embedded photo is 259×258 at +44+53, cut out and upscaled to 800. Soft. Replace with the original. The signature also gave her name ("Marie Hernandez") and title ("Case Manager"), which replaced "Marie Castillo-Hernandez / Personal Injury Medical Coordinator" on 2026-09-08. |
| `itzel-tapia.png` | `public/team/itzel-tapia.webp` | 1103×1426 original. Cropped to 1000×1000 at +50+20, then scaled to 800. |

## Adding someone

Anyone listed without an `image` renders as an initials monogram. To publish
a photo, drop an 800×800 webp into `public/team/<slug>.webp` and set
`image` on that person in `src/lib/team.ts`.
