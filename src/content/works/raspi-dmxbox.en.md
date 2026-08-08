## Overview

raspi-DMXBox is a control system built with Raspberry Pi and Python to operate event lighting and audio from a single interface.

It sends DMX through a USB OpenDMX interface and lets operators trigger lighting fades from a browser or an external controller. It also communicates with audio equipment over OSC, bringing microphone mute controls into the same interface.

This was the first practical version of the system. Lessons from operating it later became design requirements for its successor, DMXBOX.

## Purpose

Event operation requires more than switching lights on and off. Operators may need timed fades, separate control of selected fixtures, and microphone mute controls across different devices.

I used a Raspberry Pi as the central controller and built a web interface that could be operated from a phone or PC.

## Architecture

The Python backend separates functions into multiple processes. A parent process routes messages among DMX output, the Web API, TCP input, and OSC output.

```text
Browser ─ FastAPI ┐
Controller ─ TCP ─┼─ Message routing ─ DMX output ─ Lighting fixtures
                  └────────────────── OSC output ─ Audio equipment
```

FastAPI serves both the API and the control interface. The frontend uses Bootstrap and JavaScript, with large controls intended to remain easy to operate on a smartphone.

## DMX Output

The system uses an FTDI-based OpenDMX interface to transmit one DMX universe with up to 512 channels.

Each channel stores a value from 0 to 255. The fade logic tracks its starting value, target state, start time, and end time, then calculates the current output from elapsed time to produce configurable fade-ins and fade-outs.

Additional channels can be registered separately from the main lighting group and controlled independently. The system also supports per-channel maximum output, fade duration, and start delay settings.

## External Integration

Control is not limited to the browser. A TCP service accepts short commands from external controllers for fades, immediate on and off, and microphone mute and unmute.

Audio operations are converted into OSC messages. This provides one operator-facing control flow while the lighting and audio devices continue to use different protocols.

## Browser Configuration

Operators can configure target DMX channels, additional channels, per-channel maximum values, fade duration, and delay from the browser. Settings are persisted in JSON so the system can be adjusted for an event setup.

For fixtures with adjustable color temperature, I also combined multiple DMX channels into brightness and color controls so operators did not need to manipulate each raw channel value separately.

## Lessons from Operation

raspi-DMXBox consolidated the required controls, but continued operation also exposed architectural limitations:

- Inter-process message formats and handlers were tightly coupled, making features harder to extend and maintain
- The design assumed Raspberry Pi and Linux, limiting deployment to other environments
- A disconnected USB-DMX device could not recover automatically during operation
- Some configuration changes made state management and application logic increasingly complex

Rather than continue adding local fixes, I treated these findings as requirements for a broader redesign.

## Evolution into DMXBOX

The successor, DMXBOX, was reimplemented in Go around the operational requirements discovered through raspi-DMXBox. Its design separates inputs and outputs into modules and considers configuration reloads, recovery from device disconnection, and builds for multiple operating systems and CPU architectures.

raspi-DMXBox demonstrates a cycle of quickly delivering a focused practical system, learning from real operation, and carrying those lessons into a stronger architecture.

## Technologies

- Raspberry Pi / Linux
- Python
- FastAPI / Uvicorn
- JavaScript / Bootstrap
- FTDI / OpenDMX / DMX512
- TCP / OSC
