---
layout: post
title: Plant detection for agricultural drone using OpenCV computer vision
remote-image: https://github.com/fflori4n/fflori4n/raw/main/assets/pics/drone_plant_detect.gif
date: 2023-02-10
show_excerpts: true
show_wide_feature_image: true
---

R&D project in collaboration with Drontech ([Drontech Facebook page](https://www.facebook.com/dronteh)) to develop a proof of concept for a device that uses computer vision to estimate plant mass beneath a drone.
A GPIO pin is set to HIGH when plant mass exceeds a defined threshold, the signal is intended to control sprayer valves, turning off pesticide flow when the area under the flight path lacks viable cultivation or the plants have dried out, avoiding unnecessary pesticide use on unproductive areas.

<img src="https://github.com/fflori4n/fflori4n/raw/main/assets/pics/droneWGreenLed.png" alt="drone with cam device under it" style="width: 42.5%; height:auto;">

*This is a picture of the "flight article" rpi, it can be seen fixed at the bottom of the drone, the camera is looking forward-down. yes, rpi is getting absolutely blasted by ground obstacle radar which is probably not good for the pi or the radar*

#### Timeline

Developement was done in two stages:
- first a CV algorith was created in python OpenCV based on recorded video footage. The clasification of plants is based only on color and noise/texture. - using YOLO V4 for weed classification was considered but abbadoned due to the limited hardware capabilities, and because it was only a proof of concept.
- after that the computer vision algorithm was rewritten in OpenCV C++ to allow real time processing.

#### CV algorithm

<img src="https://github.com/fflori4n/fflori4n/raw/main/assets/pics/drone_plant_detect.gif" alt="gif plant detect" style="width: 100%; height:auto;">

This gif shows the testing of the algorithm. I cycle through multiple sources of footage previously collected by the drone, and looking at the highlighted plants - then tune the parameters or the algorithm and repeat.
This part of the developement uses python, because it is flexible and easy to change - but it is in no way real time, or running on actual hardware, that comes later.

The algorithm works based on pixel colors, and texture roughness. Basically this is the simplest way to detect plants, but simple is good because the algorithm will be run on a RPI4. This is not a great solution  because it depends on lighting conditions to a degree - harshe sunlight/ shadows can mess up the detector and blind the camera.

Segmentation based on color sounds simple, and it is, but it takes a lot of fiddleing with the parameters to get it to work.

Actually the detection uses a few steps:
- drop the resolution, resize with closest interpolation and also reduce the color depth - because of processing limitations.
- transform it using 4D matrixes (image transform matrixes? I forget what they're called), so the image represents a top down view of the area in front of the camera - this is why some videos on the gif are funnel shaped
- convert to CSV
- create "light intensity/ saturation too low/ too high" mask - obviously if camera sees only black or white thats probably not plants. If the image is washed out, saturation is low - we can not tell the difference between colors, so ignore that aswell.
- create "brown mask" - this will detect dirt, later will be used as a negative mask
- create "green mask" - the actual plants.
- combine all masks to get only the green positive pixels
- filter out small groupings of green-positive pixels (this is done by resizing to small, then back to large mat using CV function, found this is faster then convulution/kernel based filters)

#### The "flight hardware"

<img src="https://github.com/fflori4n/fflori4n/raw/main/assets/pics/rpiDroneCam.jpg" alt="gif plant detect" style="width: 66%; height:auto;">
<img src="https://github.com/fflori4n/fflori4n/raw/main/assets/pics/rpiFlying.png" alt="gif plant detect" style="width: 66%; height:auto;">

The algorithm runs on a Raspberry Pi 4 using OpenCV C++ for real-time frame processing. Due to limited processing power the frame rate is relatively low (around 15 FPS).
For testing purposes, a green LED was connected to the GPIO output - *the one green dot seen on the picture with the drone* - (the status of the output is sent also via WiFi telemetry) - and the drone flown over roads, bare land and different kinds of crops and roadside weeds.

Overall performance was okay, but the functions were very limited. This system can not tell the difference between weeds and regular plants. 

#### In conclusion

A better system could use some kind of tenserflow + YOLO + (external hardware CV accelerator) to perform plant classification, and get the actual area and exact location of the weeds.
Actually, this guy on youtube build something very similar to that idea: 
<a href="https://www.youtube.com/watch?v=Fflbc_y2IGQ"> https://www.youtube.com/@nathanbuildsdiy </a>
 - it is still not realtime, but still this is next level stuff for a hobby project. Worth the watch you will be very impressed. ** Also the weed burning magnifying glass robot is awesome **

Also I was very dissapointed with the lack of developer access to the drone's software - it exists on paper, but very hard to get, and expensive - ideally, the drone would provide an API to get the camera feed, GPS location, speed or a way to turn on/off the pump - and the processing could be done remotely on some beefy laptop, right now the drone needs to carry additional weight and it needs to be modified to allow switching of the sprayers - this could be entirely a software feature if the manufacturer opened a developer API to the drone. This drone was from one of the most famous chinese drone makers (*if you know you know*), but sadly I expect other manufacturers to not be any better in this aspect.

So ultimately weed detection and selective spraying will probably be implemented by the manufacturer of the drone at some point - but still this was a fun project to work on.




