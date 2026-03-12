---
layout: post
title: IoT Beehive
image: /assets/images/post-iot-beehive/IMG_20240911_165215_preview.jpeg
github-link: https://github.com/fflori4n/smartHive
show_excerpts: true
show_wide_feature_image: true
tags: IoT Beehive Sensor-System Mobile-Network MQTT Solar ESP-WROOM-32 Atmega168
---

Made for my master's thesis, the purpose of this smart hive system is to collect sensor data from remote beehives. The system consists of multiple embedded devices.
The system can function On-or Off grid, it can use 4G/LTE or WiFi to send data to a remote server. The sensors are monitoring temperature, humidity inside the hives, outside weather conditions, has a scale connected to measure hive weight (though this one is only a prototype to test the sensor), motion sensor and GPS position. These measurements provide information that can be monitored in real time by the beekeeper, or analyzed at a later date to evaluate environmental effects to the individual colonies of bees. 

> This is quick overview and some interesting details/notes, the post is intended to serve as inspiration for other people thinking of working on similar projects - I was experimenting with a lot of different things that were not used in the end, but are still interesting or might be useful for other projects.

## Quick architectural overview

In practice the system looks like this scheme:
> This architecture has a lot of complexity it is very hit or miss. There is a reason most such IOT devices use small battery powered sensors with minimal power consumption combined with modern protocols such as Lora-WAN or Bluetooth low energy (BLE).

<img src="/assets/images/post-iot-beehive/communication_paths.png" alt="" style="width: 80%; height:auto;">

##### *Sketch of the smart hive system shows the individual devices needed for it's function*

- Sensor system consist of three types of devices:
    - Sensor dev.
    - Gateway dev.
    - Server
- Sensors are directly inserted into the hive boxes or placed near the the monitored bee colony.
- Sensor readings are collected by the Sensor device (based on Atmega168 or Atmega328p depending on the number of sensors)
- Sensor data is forwarded from Sensor dev to Gateway device via RS485 wired bus
- Gateway device based on an ESP32-WROOM-32. Device's tasks are:
    - Manage power - monitor solar power + battery, and to switch power to Sensor devices, control sleep and "low power" mode.
    - Poll Sensor devices - check if they are reachable and check their measurements.
    - Forward measurements to server - either via Wi-Fi or 4G/LTE mobile network (using SIM7000G chip)
    - Data is converted to JSON format and gets sent either via MQTT or Websocket (to Homeassistant backend or Mosquitto MQTT broker)
    - Monitor GPS location and MASL
    - Read some engineering values such as PCB temperature, electrical box temperature, signal strength of mobile network
- Server: 
    - Takes and stores measurements, can display real-time or statistical data via smartphone or web interface.
    - Uses Docker env. running
    - Homeassistant and Grafana
    - Uses Homeassistant custom component to parse measurements and data sent over Websocket (a little bit like ESPNow, I think... I also tried MQTT and REST they work ok, websoc is just convenient for me because it is fast and can create new entities in HA based on the payload - a bit like MQTT discovery only *more simpler*)
    - Hosted on local machine uses *sophisticated* reverse tunnel scheme with a domain name to bypass CGNAT to be reachable from anywhere - *at least until Cloudflare decides to start asking for money...*

> Some comments on this architecture and what I'd change the next time around:
- I'd recommend not using a dedicated Gateway device for most applications, sensor device should communicate with the server directly if possible.
- The server side proved particularly convenient and flexible, Homeassistant is fantastic, finding info on writing Custom integrations was a challenge but HA-core is all python just waiting to be analyzed and reverse engineered, so I managed to figure it out after a bit.
- I came to like Espressif's dev-environment very much, the ESP series of chips are easy to use and well documented (unlike other chinese manufacturers the docs are almost as good as the gold standard TI or STM), ESP-IDF + vscode is all you need for something like this. This project used older chips, but the new series are getting very good at all things an IOT device would need, and there is good variation in pin count, power consumption and processing power - basically all versions use the same HAL and very similar hardware modules.
- Mobile network can be good, but adds a lot of cost and could be redundant if the location has some other type of network, Wi-Fi Bluetooth or LoRa. You might find that most aviaries already have a 4G/LTE Wi-Fi router on site because they often have IP cameras or alarm systems to monitor the property.

## Flexible configuration - system gets adapted to the specific aviary's needs

As described previously, system consists of multiple devices, it can have different types of sensors and different number of Sensor devices. It can be solar powered or AC/ mains powered. It can use mobile network or Wi-Fi to connect to the internet (or local network which has a server).It can use MQTT or Websocket to communicate with the server.

To prove this capability, two different configurations were tested:
<img src="/assets/images/post-iot-beehive/aviary_heler.png" alt="" style="width: 90%; height:auto;">
<img src="/assets/images/post-iot-beehive/aviary_solar_conf.png" alt="" style="width: 90%; height:auto;">

##### *Two configurations of the smart hive system were tested, the two pictures shown a sketch of each configuration*

## What sensors does the system have? - Why do we even need to put sensors in beehives?

<img src="/assets/images/post-iot-beehive/IMG_20240911_171549_preview.jpeg" alt="" style="width: 80%; height:auto;">

##### *DHT11 temperature and humidity sensor placed inside the hive box*

> This is an image of the DHT11 sensor placed inside the hive box, bees filled the sensor's openings with propolis, this was new information for me... but it is actually a well known fact that bees will do this if the space is narrower than a so called *[Bee space](https://en.wikipedia.org/wiki/Langstroth_hive#Bee_space)*. Interestingly it does not seem to effect the sensor readings in any significant way, maybe it does slow down the measured change in temperature or humidity?

Even this basic system of sensors can bring in a fair bit of valuable data. There are a few ideas what this data can be used for, and why the this and similar projects are worth doing.
There are a lot of possibilities but to keep the scope simple this system will only fucuses on the following tasks:

A few key sensors inside and around the hive boxes allow the beekeeper to:
- Detect extreme temperatures that need immediate action - Extreme temperatures can destroy a colony if unchecked. Bees expand a significant amount of energy to keep the hive temperature stable, this is energy that could be used to gather more honey. 
- Check that Hive box is sealed, no moisture or wind can get into it - Bees glue the box shut with propolis each time it is closed, this is part of the natural hive building process. Well regulated humidity and temperature also help to minimize the risk of pests.
- Helps find an optimal position for the hive boxes, e.g. to check if dominant wind does not blow at the entrance, or how many hours (and which hours) of sunshine does each box get, if more thermal isolation is needed. Generally to see if conditions are stable. `TODO:` Compare two boxes painted different colors to see how it changes the temperature.
- Motion sensors will detect wildlife or thief hanging around the hive boxes, and the GPS will make sure that the position of the hives is known at all times.
- Measuring weight will show how a colony grows, or in winter how they use up the feed.

Of course there is room for more sensors, e.g. Detecting pesticides, [*Bee counter gates*](https://www.instructables.com/Honey-Bee-Counter-II/), Microphones or even Computer Vision enabled photo booths for measuring bees, estimating gathered pollen blobs and detecting deformities and sickness before it spreads, but that would require a much bigger development effort.

Smart hive uses the following sensors to gather beehive data:

| SENSOR NAME | MEASURES | COMMENT |
|-------------|----------|---------|
| ***Sensor device*** | | |
| DHT11/DHT22/AM2320| Temperature + Humidity |
| mmWawe or PIR | Motion detector |
| BH1750 | Light intensity detector |
| BME280 | Outside temperature, humidity and barometric pressure |
| HX711 based strain gauges | Weight | |
| ***Gateway device*** | |
| DS18b20 | Electrical box temperature |
| SIM7000G | GNSS/GPS Location, MASL, time |

## Sensor device

<img src="/assets/images/post-iot-beehive/sensor_dev_with_sensors.jpg" alt="" style="width: 80%; height:auto;">

##### *This picture shows sensors together with the Sensor device*

Located next to the hive boxes, this device could be seen as a sort of smart sensor itself.
Sensor device reads measurements from the connected sensors and it will later forward the measurements (to Gateway device) via RS485 bus - more precisely it will wait to get polled by the master device, the Gateway device, to which it will respond with it's status and the measurement of it's sensors.
Sensor device can have different configurations, different types of connected sensors.

Multiple sensor devices can be connected to the same RS485 bus, as they each have unique addresses they will respond to, though this is not a great solution because unlike more modern protocols such as CAN the frame arbitration is decided in the MCU software, SLAVE devices (Sensor devices) will keep their transceivers in receive mode, unless called upon by the MASTER - MASTER will send out a request that contains the ID of the specific Sensor device to which only the addressed slave will respond with the measurements. This proved to work reliably in the field, actually RS485 is very impressive with it's tolerance to bad connections and noise, the setup used a cable length of around 80m between the Sensor devices (located next to the hive boxes) and the Gateway device without any issues.

Why use wired connection? The thinking was:
- Save on complexity by using a single battery to power all devices
- Use an ultra low-tech and reliable protocol such as RS485 to get something that just works under any conditions, always without exception.
- Gateway device to have a "hard reset" capability - can power cycle all sensors to reset them if something goes wrong and communication is lost.

> These points were all achieved. But the good execution is still bad because the concept was bad from the start.
Using wired connection to connect these devices was admittedly a bad ide because of other factors. There are more downsides to wires:
- More expensive - Need to buy cable, cable glands, connectors (in this case UTP cable with RJ45 connectors is used for both power and RS485, a little bit like with PoE)
- More hassle to set up, someone will eventually cut (e.g. with a lawn mover or tractor), damage or steal the cable if it is a long run.
- **Water**, the biggest issue is waterproofing the enclosures. Each hole in the housing is potential place for water to enter and flood the Sensor dev - this happened more than I'd like to admit.

## Gateway device

<img src="/assets/images/post-iot-beehive/IMG_20240607_231646_preview.jpeg" alt="" style="width: 80%; height:auto;">

##### *Gateway device: ESP32 and SIM7000G devboards, solar charge controller, battery and some other parts you shouldn't pay attention to*

The main purpose of this embedded device is to provide communication between the smart sensor and the server.
Gateway is based on the combination of an ESP-WROOM-32 and a SIM7000G Mobile network modem chip.

Gateway device's functions are:
- System management (station keeping):
    - Measure voltages on battery and solar panel
    - Switch sensor supply line voltage on/off
    - Measure temperatures of battery and charge controller heat sink
    - Check communication with SIM7000G chip (UART, with AT commands)
    - Read status of SIM7000G chip - precise GPS time and position, mobile network RSSI and number of GNSS satellites and their signal quality
    - Control sleep and low power mode
- Sensor data acquisition:
    - Send poll message to Smart sensor with specific address
    - Receive measurements from Smart sensors, check that values are reasonable, and format them to create a JSON measurements object
    - Add additional meta information related to RS485 communication quality and sensor presence (e.g. sensor did not respond, faulty CRC or at least one sensor reading is out of expected range)
- Communicate with server:
    - Use one of two methods to connect to the internet, either via SIM7000G using 4G/LTE mobile network or using the ESP32's onboard Wi-Fi 
    - Send JSON system information to server
    - Send JSON sensor measurements to server

> The two network interfaces can be set up as primary and backup, to e.g. only use mobile data when Wi-Fi is down.
The data is sent to server using either MQTT(to Mosquitto or other broker) or directly using Homeassistant's Websoceket interface. I've also done some similar projects with REST API, this is supported by Homeassistant out of the box, so the upside of REST is that there is no need to install any custom integrations. Downside however is that it is a fixed structure, only the entity state can be changed and it is significantly slower than websoceket which can transfer multiple key values in a single websoc frame

<img src="/assets/images/post-iot-beehive/DSC_0074.JPG" alt="" style="width: 80%; height:auto;">

##### *Gateway device in it's case with transparent lid, to show off my mad PCB design skills*

<img src="/assets/images/post-iot-beehive/IMG_20230923_174040_preview.jpeg" alt="" style="width: 80%; height:auto;">

##### *Gateway device: On-site with a seriously oversized solar panel for the system*

The Smart hive system can be solar powered, this setup worked okay-ish, though it was not a very successful implementation. The Smart hive system needs around a 30W solar panel to function (conservatively 10W, depends on the sampling interval and number of sensors connected). Note that the panel shown here is a 200W panel because smaller panels are harder and more expensive to get. This version uses a lead-acid gel battery 12V, 7Ah which is enough for 3-4 rainy days.

> Lead-acid is not ideal, used it because I had the parts, but it eventually got fully discharged and did not survive the winter.

Turns out battery power is a deep rabbit hole, both the electronics and the code need to be optimized for low power operation. ESP32 has a fairly good system with multiple low power modes and is pretty easy to use. Actually ESP32 is comparatively bad at low power, at least the older versions, but it would be more than sufficent for a system like this. This device needs to wake up periodically and communicate with the server which obviously will use comparatively a lot of power.

> To give an idea, I made an ESP32-C3 room sensor that last around a week on a single charged 18650 lithium cell, with 5 minute periodic measurements without too much effort - just a medium range 3V3 regulator and short awake between long sleep periods.
I'm planning some more well thought out projects related to this topic, `TODO:` make a device to evaluate small current IOT devices and charger circuit efficency or battery capacity?

<img src="/assets/images/post-iot-beehive/sim7000g.JPG" alt="" style="width: 80%; height:auto;">

##### *SIM7000G dev board*

The SIM7000G is an embedded device in itself, it has it's own microcontroller running a very complex firmware to execute the logic needed to communicate via the mobile network, it can send and receive data and supports a variety of protocols such as NTP,HTTP,TCP,UDP and MQTT. Communicates with the ESP using AT commands, there is huge list of these commands and it enables the user to use all functions of the SIM device (Come to think of it the chip probably has some other interface like RMII + MDIO? But my devboard only has the UART pins routed). This SIM device also has a built in GNSS/GPS reciever which is handy for getting positioning information like lat, lon, MASL and to get precise time.

> This GPS time is used for the smart hive system as it is easier to get and more precise than NTP, GPS position could be very usefull as some hives are placed on trailers or trucks and get moved multiple times a year.


### Choose your SIM chip

Something to watch out for before choosing SIM module is the manufacturer's documentation, choose wisely as you will be on your own, most likely only a handful of appnotes and no existing library, because the AT commands differ widely between manufacturers and even versions of chips. The firmware is hard to find and harder to flash, manufacturer's forums or support is barely available even for engineers working for huge paying customers (I'm generalizing here, don't have experience with SIMCOM support, the docs are okay I guess, could be better).

One issue I ran into is that: With prepaid sim cards, the user might want to know the remaining funds on the card, but USSD codes are not working on my specific firmware for the SIM7000G, so this idea was dropped.

> Current implementation will politely inform the user of insufficient funds on the card by strategically stopping all data flow to the server and promptly becoming unreachable.

For the hobbyist, when mobile connection is required by the project my advice would be to design the system around an existing devboard that has a network chip. There exists a few versions of the [TTGO](https://www.aliexpress.com/item/1005001705250713.html) boards which use basically the same setup as this Gateway device ESP + SIMCOM, and they seem to be very popular and well supported, they are definitely pricy around 20 to 50Eur but this is an investment into your mental health, so well worth it.

One more thing to consider when using mobile networks, 

> SIM cards are an absolute pain in the backend

Depending on country it might be in the range of moderately complicated to impossible to get NB-IOT cards without a registered company, at least x number of units and a contract/payment plan for at least a year. Both Regular contract sims and prepaid sims need to be registered and activated with a face picture/ ID (for reasons?) which adds a lot of extra work to deploying a unit. Cards are also very expensive when talking about IOT devices. Any system that has a sim card will need maintenance and only get (based on my experience) more expensive and more convoluted to use over time for some reason (I of course blame the government for this, as one does).

## Server side

Server is running on a Ubuntu mini-PC, all software is installed in docker environment (with docker-compose of course).
On a good day it is running:
- Homeassistant - the main backend/ I also use it for other sensors and smart home stuff
- Grafana - Nice graphs
- Influx-db
- Mosquitto - MQTT broker
- Cloudflared-tunnel

> Cloudflared: my internet connection recently has been upgraded with a complementary CGNAT firewall, so that my ISP can save some money on IPV4 addresses - breaking my smart hive system, and also making the MQTT data transfer impossible. This cloudeflare tunnel is basically a free (at least for now) version of vpn-tunnel, that allows me to reach local HTTP ports from the internet. For regular non-CGNAT networks I would recommend [Duck-DNS](https://hub.docker.com/r/linuxserver/duckdns), ISP's DDNS or Ol' reliable static IP.

With this system, the measurements are stored inside Homeassistant, if the beekeeper has an existing Homeassistant server it can be easily expanded with the smart hive sensors. As mentioned, the system uses either MQTT or Websocket to transmit data to Homeassistant, those frames contain the so called service data (the payload) as a JSON object, when the frame is received a HA integration is triggered to process the incoming data and update the entities inside HA - In this case this is done in a Custom Integration that is basically a python backend. This code will read and parse the json object, and create or modify entities (tags/sensors) inside HA.

### A little digression about using Websockets and clustering different entities together

Using this type of backend, the payload is basically freeform and can be changed, or the integration can be expanded to support different formats. e.g. with my websocket Custom integration the following endpoints are available:
- create entity
- set/update entity
- set multiple values with key-value pairs

The first two could easily be done using [REST](https://developers.home-assistant.io/docs/api/rest/) without modifying the HA instance or installing any new integrations.
The third one however proved very useful for cutting down on repeating data such as headers, HA domain and sensor labels and websoc message IDs. If the only parameter that needs updating is state of the entity, it is more efficient to send multiple entities in the same websoc frame as key-value paris.

> Why bother with this optimisation? 

Well sending these entities via REST one by one actually makes the whole system more expensive, in a little part because of network usage but mostly because of power usage. 
The more we can cut down the time spent communicating, the faster our sensor can switch back to deep sleep, which will in turn lead to 

smaller power usage -> smaller battery -> less expensive system

or at the very least system with improved power usage. In practice using this trick, the transmission time can be cut from around 10secs to 3-5secs.

`TODO:` One more idea would be to cluster measurements taken at different times together and combine them into a single websoc frame, then reconstruct them and add them to HA history database with their specific order/measurement time in mind. This sounds very promising to me, as you could get data with e.g. 1 minute period at the end of each hour (basically 60 samples for the power usage of a single sample) although the downside is that it wouldn't be real time update, but for most cases this would work well enough.

<img src="/assets/images/post-iot-beehive/mob_dashboard_smart_hive.png" alt="" style="width: 80%; height:auto;">

##### *Measurement can be monitored using the Homeassistant app*

<img src="/assets/images/post-iot-beehive/grafana_dashboar_hive.png" alt="" style="width: 80%; height:auto;">

##### *Grafana dashboard for displaying trends, historical data and better nicer visualizations*

## Measurements from the hives

> Disclaimer: I am no beekeeper, know very little about bees

### Detecting swarming events based on hive temperature?

I'd like to show you this graph that was recorded summer to fall inside a young/ weaker colony:

The graph shows the daily minimum and maximum temperature recorded from DHT temperature probes that are placed inside two different hive boxes next to each other, measuring the temperuture between the hive's frames. Let's call them "Blue" (t0) and "White" (t1) colonies (based on DHT sensor color). The ambient temperature is also displayed, although maximum daily value is hidden as it is not interesting.

Bees have a characteristic behaviour called "swarming", swarming means that the colony leaves the hive box behind either because there are too many queen bees inside a single box and they want to split the colony, or because the conditions inside the hive box are unfavorable for the colony. Either way the bees leave the hive box in large groups and try to find a new suitable home. In this case unfortunatelly it is the latter case, the colony was too weak to keep the hive box running, so they decided to abandon ship - this moment was recorded by the smart hive sensors on this graph.

> Can you tell which hive box had the swarm event based on temperature readings?

<img src="/assets/images/post-iot-beehive/Hive_temp_and_ambient_temp_graph.png" alt="" style="width: 150%; height:auto;">

##### *Daily minum and maximum temperatures recorced inside Blue hive, White Hive + Ambient temperature*

Hint: The difference is visible in minimum peek temperature compared to minimum peek ambient temperature.

The left side of the graph clearly shows that the minimum daily temperatures inside the two boxes are approximately the same, while ambient temperature is lower. While on the right side, one of the boxes keeps this temperature differentce, but the other one shows the same approximate temperature as the outside ambient temperature sensor, based on this we can tell that "Blue" hive box is empty.

### Measured relative and absolute humidity?

<img src="/assets/images/post-iot-beehive/relative_humitdity.png" alt="" style="width: 150%; height:auto;">

##### *Daily relative humidity recorded inside Blue hive, White Hive + Ambient*

There is a difference on the right side of the graph between blue and white colonies (as the blue box is empty), but I can only speculate if the difference in humidity is caused by the swarming, or the swarming is caused by the deviation in humidity? I do not know enough about bees to tell.

<img src="/assets/images/post-iot-beehive/absolute_humidity.png" alt="" style="width: 150%; height:auto;">

##### *Absolute humidity, Note: the precipitation is on the outside*

> when absolute humidity and the saturation humidity lines meet, that signals precipitation either heavy rain or fog

### Testing the scale

This system includes a scale for measuring hive weight, but for the time being it is being tested with a constant mass simulator (a bunch of bricks), because it would have been too invasive to build a new platform and move the hive boxes.
These weight sensors are using strain gauges connected in a Wheatstone bridge circuit and a high gain amplifier + ADC circuit. The question is if this sensor can reliably measure the weight of the hive boxes for a long period, the two concerns were:
- Temperature swings effect the sensor - this is true but depending on the application it is not that significant, the Wheatstone bridge cancels out most of the change. 
- Tare error - These weight sensors are designed to be tared (calibrated without weight) before each measurement. This is not possible with the hive boxes placed on the scale. Interestingly the measurements did not seem to record change caused by this effect over time, maybe because the test weight is too small.

<img src="/assets/images/post-iot-beehive/scale.png" alt="" style="width: 150%; height:auto;">

##### Scale measurements, note that while the timescale is the same as other measurements, this is measuring constant weight, not any of the the hive boxes

Blue line is weight measured in gramms, while the black line is the temperature of the sensor. The visible disturbance at the right side of the graph is rainwater flooding the sensor, so let's say that is expected and just ignore it.

<img src="/assets/images/post-iot-beehive/constant_weight_sensor_fluctuation.png" alt="" style="width: 150%; height:auto;">

##### Weight measurement fluctuations caused by temperature change

The measured value seem to changed based on temperature and humidity. Using an additional temperature sensor measuring the temperature of the amplifier board can help correct out the swings (this works a little bit, tested it), but it is probably more beneficial to just buy better quality strain gauges and better quality amplifier board.
The easiest workaround for this is to just average out a whole day of measurements, or take measurement only when temperature is in the middle range - This would work as the hive weight does not change significantly in a single day, and long term trends are more interesting.

`TODO:` Could bee activity be measured with a precise enough scale? (instead of a bee counter), Could the number of bees be estimated based on change in hive weight in a 24hour period? I would love to have [this](https://www.youtube.com/watch?v=hnvtstq3ztI) scale to measure each bee. With some back of the napkin math, I'd say that a standard single height LR box contains around 1000 gramms of bees, which could be measured.

<details><summary>(based on this textbook)</summary>

*dr Nada Plavša, dr Nebojša Nedić - PRAKTIKUM IZ PČELARSTVA*
*2. ANATOMIJA MEDONOSNE PČELE* - str br. 15

U pčelinjem društvu razlikujemo maticu, pčele radilice i trutove.
Radilica je najmanji član pčelinje porodice i dužina tela joj je oko 12 mm, a
masa oko 0,1 g. Matica se razlikuje po izduženom telu, krilima koja dosežu do
polovine tela i manjom glavom u odnosu na pčele radilice i trutove. Jedina je
reproduktivno sposobna ženka u pčelinjem društvu. Doseže dužinu od 20 do 25
mm i ima masu od oko 0,2 g.

*dr Nada Plavša, dr Nebojša Nedić - PRAKTIKUM IZ PČELARSTVA*
*1.2.6. Jačina pčelinjeg društva* - str. 11

Preporuka za jačinu pčelinjih društava koja se koriste u oprašivanju
može da varira jer ona mogu brojiti do 60.000 pčela. Na jednoj strani
standardnog rama iz Langstrot Rut košnice (LR) površine 880 cm2 može biti do
1100 gusto zbijenih pčela. Računa se da na jednom cm2 može biti 4 odrasle
pčele. Kod Dadant Blatove košnice (DB) na jednoj strani rama površine 1130
cm2 može biti do 1400 gusto zbijenih pčela, a na jednom cm2 mogu biti 4
odrasle pčele (Delaplane i sar., 2013)

</details>

0,1g per bee * 1100 bees per frame * 10 frames = 1100g




### Just a regular measurement

<img src="/assets/images/post-iot-beehive/hive_measurements_week.png" alt="" style="width: 150%; height:auto;">

##### Measurements during a shorter period

This is what a beekeeper sees most of the time, values are mostly stable and in expected ranges. The right side shows measurements during a rainy period.

### In conclusion

This was a fun project and definitely has a lot of room for improvements, other projects tangentially related. I'll need to be more careful with scope creep, this massive project gave me a lot of opportunities to research different topics that did not contribute to this project's goals in the end. The project architecture is too complex (needs more KISS).

The data collected would be much more useful when analyzed by a person who is experienced in the field of beekeeping, but the conclusion is that this and similar systems can be a very useful tool to help beekeepers and improve the lives of the bees.



