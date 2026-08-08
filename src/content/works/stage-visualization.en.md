![Event venue recreated in Unreal Engine](/images/works/stage-visualization.png)

## Overview

I independently designed and built a 3D simulation environment in Unreal Engine and Blender to validate an event venue's stage, lighting, and video before on-site setup.

Previously, equipment was placed from a conceptual plan and adjusted after installation. To reduce this rework, I modeled the venue and equipment from drawings and added live lighting-signal and video inputs for pre-event validation.

## Responsibilities

I handled the entire project: planning, research, venue and equipment modeling, Unreal Engine scene setup, DMX mapping, NDI integration, validation, and event operation.

I began with almost no Unreal Engine experience. I learned from introductory articles and sample projects, then repeatedly implemented, isolated gaps in my understanding, researched them, and tested again until the system was ready for practical use.

## Venue Recreation

Using venue drawings, I modeled and placed the following elements:

- Stage
- Projection screen and LED panels
- Speakers
- Lighting fixtures and trusses
- Existing fixtures such as plumbing, air-conditioning units, and ceiling beams

The models prioritize the shapes and dimensions required to validate placement, sightlines, and interference. Nonessential detail was simplified to reduce Blender production time.

The simulation supports checks from both audience and staff viewpoints, as well as equipment access, cabling, and physical interference. From the second event onward, I added smaller venue fixtures based on lessons from the initial operation.

## Lighting and Video Integration

I configured DMX mappings from fixture samples and reproduced incoming Art-Net signals in Unreal Engine. The environment visualizes the actual lighting control data; it does not control physical fixtures from Unreal Engine.

Video is played in VLC and sent to Unreal Engine through an NDI plugin. Understanding how to use the NDI feed as a texture on the modeled displays was the most challenging part. By studying samples and iterating through implementation and research, I built Blueprint clipping logic for the different display areas of the projection screen and LED panels.

## Problem Prevented Before Setup

The simulation revealed that the edge of the screen could interfere with a ceiling beam. Moving the screen position resolved the risk before setup, and it was installed on site without issue.

The shared visualization also made the intended result easier to explain to other participants.

## Results

- Reduced setup work to roughly one-third of the previous process
- Reproduced the simulated arrangement at the actual venue
- Validated audience and staff sightlines in advance
- Identified equipment-access, cabling, and interference risks before setup
- Used for three events to date

## Technologies

- Unreal Engine / Blueprint
- Blender
- Art-Net / DMX
- NDI / VLC
