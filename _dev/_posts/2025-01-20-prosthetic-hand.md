---
layout: post
title: Prosthetic hand - 3d printed partial prosthetic
image: /assets/images/post-prosthetic-hand/prostetic-hand-v08.jpg
github-link: http://github.com/AleksaHeler/OpenHand
show_excerpts: true
show_wide_feature_image: true
---
This is an RnD project, working with a team of three other engineers. Our goal is to develop a prototype for a partial hand prosthetic that can be 3D printed and built with basic hobbyist level parts. This design unlike other prosthetics, is a partial prosthetic, meaning it is worn on the wrist, and tries to replicate the function of the four 'axial' fingers - the main mechanical constraint is space as all mechanisms need to clear the hand and the thumb. A custom PCB with an STM chip is responsible for controlling the motors, with force and positioning feedback.

The project details can be read in the git repo: <a href="http://github.com/AleksaHeler/OpenHand"> http://github.com/AleksaHeler/OpenHand </a> , there is a lot of stuff, and I mean **a lot**, definitely worth the read.

there are so many aspects of this project, I will only write a brief about lessons learned related to two topics:
- mechanical design
- motor feedback

### Some thoughts about the mechanism

There is a lot of 'robotic hand' projects on the internet, it is commonly developed for humanoid robots, prosthetics or student projects. From the mechanics side, there are two common approaches:
- Cable driven fingers - this allows the finger to have better articulation, the motors are located at a distance. The downside of this approach is durability and size/ weight, grip strength is fairly weak, more parts, finicky cables and a lots of moving components.
- Rigid linkage - this is our chosen approach, the finger is actuated directly by a single motor - this means that there is only a single degree of freedom per finger, the fingertip (dist. phalanx) and the middle part of the finger (middle phalanx) move on a predetermined trajectory that emulates the natural movement a finger would take when gripping an object.

After cost/benefit analysis, some shortcuts were cut:
- a finger only does 'grip' (*look up grasping patterns, there is a lot of them, grip is only one of these possible patterns*) - it is not ideal, but it will keep the mechanics side somewhat simple.
- pinky finger is not implemented by prosthesis - it is useful for holding e.g. a cup, but the same can be done with only 3 fingers if using ring finger instead of pinky - this is due to the space and weight constraints.

#### Design 1:

Using a PWM servo for moving the finger - pretty bad idea, but it is easy to test, we were only interested if the linkage actually works, as it was designed mostly using trial and error positioning of a constrained skeleton geometry in CAD. It worked, but there were some things to improve e.g. the mechanism can not be extended fully, as it crosses a singularity point and locks up. This can be seen when the dist phalanx locks up if pushed backwards (to open more) in the fully extended position - Of course that's an issue, the real human finger does not like that either...

<img src="https://github.com/fflori4n/fflori4n/raw/main/assets/pics/hand_V07.png" alt="" style="width: 50%; height:auto;">

#### Design 2:
This PWM servo solution has another problem - it just wont fit. You can't fit 3 of these mechanisms next to each other.
So the next step was replacing this servo, with a linear DC motor - this made it work much better, as there is one less joint in the linkage, it is stronger (but a little bit back drivable and flexible due to the mechanism tolerances and plastic parts). 

<img src="https://github.com/fflori4n/fflori4n/raw/main/assets/pics/fingerV2.png" alt="" style="width: 50%; height:auto;">



#### Design 3:
After this the mechanism could be optimized some more to be as lightweight as possible but still strong. The finger has a tendency to bend to one side when force is applied in the plain of the palm (*in other designs this is usually mitigated by supporting the joint on both sides, but no space for it here*) - this is not a big deal but it also shows up when gripping objects that have an angle to them, which is bad. The finger has to be somewhat bigger to not snap - the proxy phalanx can exsert a strong grip, the mid phalanx a little bit weaker, the dist phalanx is pretty weak, but it is somewhat flexible and can bend onto the object when gripping, it is springy, very interesting effect.

### Force feedback and positioning

#### Current limit - grip limit
Design one and two, use only force feedback. This is done by regulating the current to the DC motors. We found that when the current is not limited, the consumption is about 500mA per finger - this is a very strong grip. When limit is applied the hand can be used to grip 'soft' objects like an empty plastic bottle without crushing it - this works ok.

For design 3, we wanted positioning. This is a complicated problem, as it has to be space constrained, and also retrofitted onto the existing parts.

#### Analog hall sensor(s)
We experimented with analog hall sensors. A hall sensor E49 is mounted to the metacarpal, the magnet is mounted on proxy phalanx - one hall sensor either can't give enough resoulution, or can't measure the absolute position over the whole trajectory of the fingertip. This would work for rough  positioning or for position feedback only when finger is almost closed to grip objects.
To work around this, we tried two hall sensors offset from each other, to ger two curves as:

<img src="https://github.com/fflori4n/fflori4n/raw/main/assets/pics/hall_feedback_pattern.png" alt="" style="width: 80%; height:auto;">

This looks promising, because the absolute position can be determined by combining the two analog voltages to get a lookup table for position (*or angle of metacarpal and proxy phalanx which determines finger tip position*), and also knowing **if the finger is currently moving to open or to close, or at least the previous position**
Downsides are: 2 hall * 3 fingers = 6 analog voltages routed to the MCU; 6 channels used for ADC; enviroment can be noisy;

Another idea could be using a hall sensor like the AS5600 IC that uses a radially polarized magnet to sense absolute 12bit angle and generate PWM or I2C output. This is a fairly precise sensor - *had good experience using AS5600 for wind angle detection before* - but placing the magnet onto the joint is not possible in this design.

#### Using an encoder
What if we could use the motor itself for positioning? The linear actuator when broken open is just a DC motor with a lead screw. It has wipers on a pcb with mosfets to serve as endstops and stop the motor at the end of travel. Bigger motors can have closed loop control, with feedback from an optical or hall encoder - this principle is used to get servo motors (even with high torque BLDC motors) for robotics applications.
We did not find any off the shelf linear actuator with positioning capability in this small size - so we made one. The linear actuator contains a regular DC motor, the exact same DC motor with hall encoder attached can be bought online. We replaced the motor assembly in the linear actuator to use the motor with hall effect encoder, and printed a new housing for it, it took some careful disassembly and HSS shaft filing but it worked out great.
Our assumption is that these motors could be custom made easily and cheaply, they just don't currently exist - if we ever need bigger quantities for a batch of prosthetics.

<img src="https://github.com/fflori4n/fflori4n/raw/main/assets/pics/linear_motor.png" alt="" style="width: 100%; height:auto;">


The modifications to the motor (and the internals of these linear motors) are shared on grabcad:
<a href="https://grabcad.com/library/geared-motor-with-encoder-for-linear-actuator-1"> https://grabcad.com/library/geared-motor-with-encoder-for-linear-actuator-1 </a> 
