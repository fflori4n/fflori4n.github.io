---
layout: post
title: nod3-comfirm - Common firmware for ESP32 based devices
image: /assets/images/image_1.jpg
github-link: http://github.com/fflori4n/nod3-comfirm
show_excerpts: true
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

{% remote_include https://raw.githubusercontent.com/fflori4n/nod3-comfirm/refs/heads/main/README.md %}