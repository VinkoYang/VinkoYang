---
layout: post
title: "Top 100 Robotics Research Keywords"
date: 2026-08-04
categories: ["Research & Scholarship"]
tags: ["robotics", "control", "SLAM", "glossary"]
---
# Top 100 Robotics Research Keywords

---

### 🦾 1. Kinematics, Dynamics & Control

* **Forward Kinematics**: Calculating the end-effector position from joint angles.
* **Inverse Kinematics (IK)**: Determining required joint angles to reach a desired target position.
* **Jacobian Matrix**: A mathematical mapping between joint velocities and end-effector linear/angular velocities.
* **Rigid Body Dynamics**: Modeling the forces and torques that cause robotic motion.
* **Force Control**: Regulating the contact forces exerted by a robot on its environment.
* **Impedance Control**: Controlling the dynamic relationship between robot position and contact forces.
* **Admittance Control**: Measuring external forces to modify the robot's target trajectory.
* **Model Predictive Control (MPC)**: An advanced control method optimizing future actions over a time horizon.
* **PID Controller**: A classic feedback loop calculating Proportional, Integral, and Derivative errors.
* **Trajectory Generation**: Computing smooth, collision-free time-indexed paths for robot components.
* **Underactuated System**: A robot with fewer independent actuators than degrees of freedom.
* **Degrees of Freedom (DoF)**: The number of independent parameters defining a robot's configuration.
* **State Estimation**: Using sensor data to track a robot's internal and spatial status.
* **Kalman Filtering**: An algorithm estimating hidden variables from noisy sensor measurements.
* **Optimal Control**: Finding a control law that minimizes a specific performance cost function.

---

### 🗺️ 2. Perception, Localization & Mapping

* **SLAM (Simultaneous Localization & Mapping)**: Constructing a map of an unknown environment while tracking robot position.
* **LiDAR (Light Detection & Ranging)**: Sensing distances by illuminating targets with laser light pulses.
* **RGB-D Camera**: An imaging sensor providing both standard color and per-pixel depth data.
* **Sensor Fusion**: Combining data from multiple sensors to reduce uncertainty.
* **Point Cloud**: A collection of 3D data points representing external object surfaces.
* **Odometry**: Estimating change in position over time using wheel encoder data.
* **Visual Odometry (VO)**: Estimating robot ego-motion by analyzing sequential camera images.
* **IMU (Inertial Measurement Unit)**: An electronic device measuring acceleration and angular velocity.
* **Occupancy Grid Mapping**: Representing environments as a field of binary free-or-occupied cells.
* **Loop Closure**: Recognizing a previously visited location to correct accumulated SLAM errors.
* **Object Pose Estimation**: Determining the 3D position and orientation of target objects.
* **Active Perception**: Controlling camera or sensor positions explicitly to maximize information gain.
* **Semantic Mapping**: Injecting high-level object class labels into geometric environmental maps.
* **ToF (Time-of-Flight)**: Measuring distance based on the travel speed of light or sound.
* **Structure from Motion (SfM)**: Reconstructing 3D structures from sequences of 2D images.

---

### 🧭 3. Motion Planning & Navigation

* **Configuration Space (C-Space)**: The set of all possible positions and orientations of a robot.
* **A* Search Algorithm**: A graph traversal algorithm finding the shortest path using heuristics.
* **Dijkstra's Algorithm**: An iterative algorithm finding shortest paths from a single source node.
* **RRT (Rapidly-exploring Random Trees)**: A randomized sampling-based algorithm for high-dimensional path planning.
* **PRM (Probabilistic Roadmap)**: A sampling-based method building a connectivity graph of obstacle-free space.
* **Obstacle Avoidance**: Modifying real-time trajectories dynamically to bypass detected environmental obstacles.
* **Vector Field Histogram (VFH)**: A real-time local path planning method utilizing polar obstacle grids.
* **Artificial Potential Field**: Planning paths by treating targets as attractive and obstacles as repulsive forces.
* **Dynamic Window Approach (DWA)**: A velocity-space local navigation approach optimized for mobile robots.
* **Global Path Planner**: A high-level system computing long-distance routes using prior map data.
* **Local Planner**: A reactive system generating immediate velocity commands to bypass sudden obstacles.
* **Kinodynamic Planning**: Motion planning subjected to both kinematic constraints and dynamic limits.
* **Non-holonomic Constraints**: Velocity constraints that cannot be integrated into position coordinate constraints.
* **Coverage Path Planning**: Generating paths that ensure a robot passes over every point in an area.
* **Heuristic Search**: Path planning accelerated by using educated guesses to evaluate node values.

---

### 🧠 4. Robot Learning & Manipulation

* **Reinforcement Learning (RL)**: Training robots via trial-and-error using reward and penalty signals.
* **End-to-End Learning**: Training a neural network directly from raw pixels to motor torques.
* **Grasp Synthesis**: Computing optimal hand configurations to securely pick up target objects.
* **Dexterous Manipulation**: Using multi-fingered articulated hands to reposition objects within a grasp.
* **Imitation Learning**: Training robot behavior policies by cloning human operator demonstrations.
* **Sim-to-Real Transfer**: Transferring control policies trained in simulators into physical hardware.
* **Domain Randomization**: Varying simulator environments randomly to bridge the reality gap during training.
* **Behavior Cloning**: A supervised learning approach mapping states directly to expert action datasets.
* **Soft Actor-Critic (SAC)**: An off-policy model-free reinforcement learning algorithm widely used in robotics.
* **Deep Q-Networks (DQN)**: Combining deep learning with Q-learning to choose optimal robotic actions.
* **Tactile Sensing**: Utilizing artificial skin sensors to measure touch, slip, and pressure forces.
* **Affordance Landscape**: Identifying potential interaction regions on objects suitable for operational tasks.
* **Visual Servoing**: Controlling robotic movement utilizing real-time feedback loops from computer vision.
* **Residual Policy Learning**: Combining analytical control laws with learned neural network error corrections.
* **Curriculum Learning**: Training robots on progressively harder tasks to accelerate policy convergence.

---

### ⚙️ 5. Hardware, Actuations & Mechanisms

* **End-Effector**: The device attached to a robotic arm's wrist to interact with environments.
* **BLDC Motor (Brushless DC)**: Synchronous electric motors providing high torque density and efficiency.
* **Harmonic Drive**: A compact strain-wave gear assembly offering zero-backlash speed reduction.
* **Direct Drive**: Actuation mechanisms connecting motors directly to loads without intermediate gearing.
* **SEA (Series Elastic Actuator)**: An actuator introducing intentional compliance via a spring in series.
* **Quasi-Direct Drive (QDD)**: High-torque motors paired with low-ratio gears for backdrivable leg movement.
* **Backdrivability**: The ability of an actuator to transmit external forces smoothly back to the motor.
* **Pneumatic Artificial Muscle (PAM)**: Flexible membranes that contract when inflated with compressed air.
* **Piezoelectric Actuator**: Materials that deform micro-positionally when subjected to electrical fields.
* **MEMS (Micro-Electro-Mechanical Systems)**: Miniaturized mechanical and electronic components built on silicon chips.
* **Slip Ring**: An electromechanical device allowing the transmission of power and electrical signals across rotating joints.
* **Linkage Mechanism**: An assembly of rigid bodies connected by joints to manage force and motion.
* **Parallel Manipulator**: An articulated system where multiple closed-loop kinematic chains support one platform.
* **Serial Manipulator**: An open kinematic chain composed of sequential links connected by active joints.
* **Exoskeleton**: A wearable mobile machine powered by actuators enhancing human physical capabilities.

---

### 🛸 6. Robotic Soft, Swarm & Field Paradigms

* **Soft Robotics**: Constructing robots from highly compliant materials to mimic biological tissues.
* **Bio-inspired Robotics**: Designing systems that replicate structural and behavioral traits of animals.
* **Swarm Robotics**: Coordinating large groups of simple robots using decentralized local rules.
* **UAV (Unmanned Aerial Vehicle)**: Airborne robotic systems capable of autonomous or remote flight paths.
* **UGV (Unmanned Ground Vehicle)**: Terrestrial mobile machines operating without human drivers onboard.
* **AUV (Autonomous Underwater Vehicle)**: Self-propelled submerged systems executing deep marine missions.
* **Humanoid Robotics**: Designing robots with body structures mimicking the human anatomy.
* **Quadrupedal Locomotion**: Four-legged walking mechanics prioritizing dynamic balance and terrain traversing.
* **Micro-robotics**: The field of robotics focused on fabricating devices under millimeter scales.
* **Continuum Robot**: Continuously curving, trunk-like robotic structures lacking discrete rigid joints.
* **Distributed Robotics**: Multiple individual robotic agents working together to solve decentralized tasks.
* **Surgical Robotics**: High-precision medical systems assisting doctors during micro-invasive operations.
* **Exo-suit**: Textile-based wearable devices providing localized joint assistance without rigid frames.
* **Agriculture Robotics**: Autonomous systems tailored for seeding, weeding, harvesting, and crop monitoring.
* **Legged Odometry**: Estimating walking robot trajectories by counting foot contact and joint angles.

---

### 🛠️ 7. Architecture, Middleware & Evaluation

* **ROS (Robot Operating System)**: A flexible open-source framework providing libraries and tools for robot software.
* **URDF (Unified Robot Description Format)**: An XML file format used to specify robot geometries and kinematics.
* **Gazebo**: A popular 3D robotics simulator capable of computing complex physics environments.
* **MuJoCo**: A fast physics engine optimized for model-based control and contact dynamics.
* **Isaac Sim**: Nvidia's photorealistic simulation environment built for photo-accurate, accelerated robot training.
* **Middleware**: Software layers facilitating message passing between distributed hardware nodes.
* **Determinism**: The predictable scheduling guarantees required for high-frequency robotic execution.
* **Pub/Sub Architecture**: A messaging pattern where nodes publish topics or subscribe to incoming streams asynchronously.
* **TF Tree (Transform Library)**: A coordinate system tracker monitoring relative spatial transforms over time.
* **Odometry Drift**: Cumulative positioning errors caused by wheel slippage and sensor noise.
* **Real-time Kernel**: An operating system modification ensuring strict timing constraints for motor safety.
* **Hardware-in-the-Loop (HIL)**: Testing control software by connecting it directly to real hardware processors.
* **Reproducibility**: The baseline standard of validation requiring robotic experiments to run consistently across labs.
* **Mean Time Between Failures (MTBF)**: A metric measuring the reliability and endurance of automated hardware.
* **Over-the-Air Update (OTA)**: Deploying software fixes and model weights wirelessly to fielded robot fleets.
