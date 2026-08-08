## Overview

IRIG2JJY-M5 is firmware that decodes an IRIG-B time signal and converts it into a JJY-format time-code signal that can be used to synchronize radio-controlled clocks.

I created it after a friend asked for a low-cost way to synchronize a radio-controlled clock using an IRIG signal. Considering availability and cost, I selected the M5StickC Plus as the base hardware.

I was responsible for the hardware design and firmware development.

## Main Features

- IRIG-B capture and decoding through GPIO interrupts
- System-clock synchronization from decoded IRIG-B time data
- JJY time-code generation including minute, hour, day of year, year, weekday, and parity data
- 10 Hz JJY output using an ESP32 hardware timer
- Output-clock correction based on the timing difference between IRIG input and JJY output
- IRIG and JJY processing assigned to separate ESP32 cores
- LCD display of time, decoded data, and output state
- Device restart using the built-in button

## Technology

- M5StickC Plus / ESP32
- C++ / Arduino Framework
- PlatformIO
- FreeRTOS tasks
- GPIO interrupts / ESP32 hardware timer
- Unit testing with Unity

## Technical Challenges

### Synchronizing Two Clocks

The IRIG input reference and the ESP32 hardware timer used for JJY output run from separate clocks. Their timing would gradually drift if left uncorrected, so the firmware needed to synchronize them continuously.

### Reliably Decoding IRIG-B

The firmware must classify incoming GPIO pulses as zero, one, or marker symbols and reconstruct them as a one-minute frame. It also needs to find the beginning of a frame when reception starts partway through a signal.

### Generating JJY from a Continuously Advancing Clock

Because time never stops advancing, the firmware must generate each minute of time-code data while continuing one-second output without interruption. Shared data must also remain safe across the main loop, interrupts, and two processing tasks.

## Solutions and Technical Design

The firmware captures both rising and falling IRIG-B edges through a GPIO interrupt and classifies each pulse from its duration. Two consecutive markers identify the start of a frame, after which 100 elements are stored in a buffer. Marker positions are validated at ten-element intervals before the seconds, minutes, hours, day of year, and year are decoded from BCD data. The ESP32 system clock is updated only after a valid time has been decoded.

The JJY encoder generates a full minute of output data from the current time. Zero, one, and marker symbols are represented by pulses of 0.8, 0.5, and 0.2 seconds, then written to GPIO at 10 Hz from a hardware-timer interrupt. In addition to minute, hour, day-of-year, year, and weekday data, it generates time parity and the special patterns used at minutes 15 and 45.

To synchronize the clocks, I implemented a Clock Manager that records the timing difference between the IRIG reference edge and the JJY output edge. It averages the five most recent differences and adjusts the hardware-timer period. The correction is capped to prevent abrupt timing changes.

IRIG decoding and JJY generation run on separate ESP32 cores. Buffers shared between tasks and interrupt handlers are protected with critical sections. IRIG, JJY, and Clock Manager are separated into independent classes, with unit tests based on known timestamps and expected signal sequences.

## Current Status

The complete physical device, including its transmission circuit, has not yet been built. However, operation from IRIG-B decoding through JJY time-code signal generation has been verified.

## Next Step

The next step is to design the transmission circuit that will deliver the generated JJY time code to a radio-controlled clock and complete the physical device.
