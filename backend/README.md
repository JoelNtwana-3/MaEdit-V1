# MaEdit backend integration

This folder documents where production features can be connected.

## Video processing

Use FFmpeg for:

- trimming
- joining clips
- adding audio
- rendering text overlays
- exporting MP4

## AI image generation

Possible no-subscription/local options:

- Stable Diffusion
- SDXL
- ComfyUI
- Automatic1111

The desktop app should call a local service such as:

`http://127.0.0.1:8188`

## AI video generation

Possible local options depend on the user's GPU and available model:

- ComfyUI video workflows
- Stable Video Diffusion-compatible workflows
- Other locally hosted video-generation models

Do not hard-code API keys into the application. Use environment variables or a secure settings screen.
