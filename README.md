# MaEdit V1

MaEdit V1 is a Windows desktop editor project built with React, Vite and Tauri.

## Included

- Photo editor interface with live adjustments
- Video editor interface with import, preview and editing controls
- AI image creator interface
- AI video creator interface
- Projects page
- Tauri Windows desktop configuration
- GitHub Actions workflow for producing a Windows `.exe` installer

## Important

This repository is a build-ready foundation. The photo controls and interface work in the frontend. Video export and AI generation require the corresponding native/backend implementation or provider configuration.

AI generation is not automatically unlimited or free. For no-subscription use, connect local models or a provider that offers a free quota.

## Build on GitHub

1. Create a new GitHub repository named `MaEdit-V1`.
2. Upload every file in this project.
3. Open the **Actions** tab.
4. Select **Build MaEdit V1 for Windows**.
5. Click **Run workflow**.
6. When the workflow finishes, open the workflow run.
7. Download the artifact named `maedit-v1-windows-installer`.
8. Inside the downloaded artifact, run the `.exe` installer on Windows.

## Local development

Install Node.js 20 or newer.

```bash
npm install
npm run dev
```

For Tauri development on Windows, install Rust, Microsoft C++ Build Tools and WebView2.

```bash
npm run tauri dev
```

To build the Windows installer:

```bash
npm run tauri build
```
