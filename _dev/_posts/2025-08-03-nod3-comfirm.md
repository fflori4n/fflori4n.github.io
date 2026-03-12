---
layout: post
title: nod3-comfirm - Common firmware for ESP32 based devices
image: /assets/images/post-nod3comfirm/IMG_20250617_205827.png
github-link: http://github.com/fflori4n/nod3-comfirm
show_excerpts: true
show_wide_feature_image: true
tags: ESP-IDF ESP32-C3 C++ IoT
---

**nod3-comfirm** - is an ESP_IDF based firmware intended to be used as a template/ starting point for future IoT projects. It is primarily written for ESP C3.
Using ESP_IDF and modern(ish) C++ ( *to avoid the usual cowboy enthics of C projects ~ though it is less efficient* ), nod3-comfirm aims to be used as a basic firmware for smart sensor devices. Firmware has basic functions that are needed for every IoT thing, like:
- Network management (WLAN)
- IO Control
- ADC continous/ DMA and other ADC functions
- Time keeping, NTP and RTC functions
- Websocket communication with Homeassistant custom component
- libraries for common sensors using I2C

**nod3** can be modified to taylor it to the specific project, add support for new sensors, or other application specific functions.

<img src="/assets/images/post-nod3comfirm/IMG_20250612_191400_preview.jpeg" alt="" style="width: 49%; height:auto;">
<img src="/assets/images/post-nod3comfirm/IMG_20250619_172229_preview.jpeg" alt="" style="width: 49%; height:auto;">
<img src="/assets/images/post-nod3comfirm/IMG_20250513_223343_preview.jpeg" alt="" style="width: 49%; height:auto;">
<img src="/assets/images/post-nod3comfirm/IMG_20250427_013347_preview.jpeg" alt="" style="width: 49%; height:auto;">
<img src="/assets/images/post-nod3comfirm/IMG_20250427_013503_preview.jpeg" alt="" style="width: 49%; height:auto;">
<img src="/assets/images/post-nod3comfirm/IMG_20240616_200126_preview.jpeg" alt="" style="width: 49%; height:auto;">
<img src="/assets/images/post-nod3comfirm/IMG_20240325_234548_preview.jpeg" alt="" style="width: 49%; height:auto;">
<img src="/assets/images/post-nod3comfirm/IMG_20240617_194040_preview.jpeg" alt="" style="width: 49%; height:auto;">
<img src="/assets/images/post-nod3comfirm/IMG_20241022_184502_preview.jpeg" alt="" style="width: 49%; height:auto;">
<img src="/assets/images/post-nod3comfirm/IMG_20241023_191640_preview.jpeg" alt="" style="width: 49%; height:auto;">
<img src="/assets/images/post-nod3comfirm/IMG_20241004_181505_preview.jpeg" alt="" style="width: 49%; height:auto;">


