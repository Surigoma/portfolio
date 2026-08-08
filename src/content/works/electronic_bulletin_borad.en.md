## Overview

This is a custom monochrome LED matrix system for displaying scrolling text, video, freehand drawings, and audio visualizations.

I designed the overall system and developed the LED controller circuits and boards, ATmega32 firmware, communication protocol, and C# Windows application. A friend assembled the physical LED panels to the shared specification.

The control application sends generated display data to the panels over UART. Because the display has a limited resolution and only one color, I implemented several binarization and dithering techniques to preserve recognizable detail.

## Responsibilities

- Overall system architecture
- Controller circuit and PCB design in Eagle
- ATmega32 controller-board development
- AVR firmware development in C
- Communication protocol design
- Windows control application development in C#
- System integration and verification

A friend was responsible for assembling the physical LED panels.

## Features

- Horizontally scrolling text
- Video playback converted for the LED display
- Mouse-based freehand drawing
- Audio volume meters
- Audio waveform display
- FFT frequency-spectrum display
- Output preview on the PC

Because each content type requires different processing, the features share a common drawing interface and can be switched at runtime.

## Architecture

The Windows application renders each content source into a Bitmap, converts it to monochrome, and divides it into packets for individual panels. Data is broadcast over UART to the parallel-connected controller boards, where ATmega32 firmware drives each assigned panel.

```text
Text, video, drawing, and audio input
                  ↓
             Bitmap rendering
                  ↓
        Binarization and dithering
                  ↓
          Per-panel bit arrays
                  ↓
              UART broadcast
                  ↓
      ATmega32 boards and firmware
                  ↓
          Custom LED panel output
```

A separate preview window enlarges the image that will be transmitted. This makes it possible to compare conversion methods and inspect low-resolution output before sending it to the physical display.

## Controller Boards and Firmware

Each LED panel connects to a custom controller board based on an ATmega32. I designed the circuit and PCB in Eagle and implemented the firmware in C for AVR.

The PC and controller boards communicate over UART. All boards are connected in parallel to the same communication line, and the PC broadcasts the same data stream to them. Each board checks the panel number in the received packet and consumes only the data addressed to it.

This avoids a separate communication path for every board and keeps the PC-side connection and transmission logic simple as panels are added.

## LED Panel Protocol

Each panel is treated as a 16×16-pixel monochrome display. A packet contains a header, the destination panel number, and bit fields representing the on/off state of each column.

For multi-panel layouts, one Bitmap is divided into panel-sized regions and transmitted in sequence. The application lets the operator configure the horizontal and vertical panel count to match the connected layout.

Rendering and UART transmission run separately. When the image changes, the application clones the current Bitmap for transmission so the sender does not read from an image while it is being redrawn.

## Image Processing for a Monochrome Display

Directly converting photos or video to a one-color display can remove important brightness differences and outlines. I implemented several selectable techniques for different types of source material:

- Fixed-threshold binarization using brightness or individual RGB channels
- Adaptive thresholding based on the image average
- Binarization combined with edge processing
- Bayer dithering
- Halftone processing
- 2×2 pattern dithering
- Sierra Lite error diffusion

Video rendering also supports crop adjustment based on the source aspect ratio. The operator can stretch content to fill the panels or preserve its ratio and crop the excess area.

## Real-time Audio Visualization

The system uses NAudio to capture Windows audio or input from an ASIO driver and stores recent samples in a circular buffer.

The volume meter aggregates amplitude over a time window and converts it into bar length. The waveform mode draws recent samples directly, while the frequency mode applies a window function and performs an FFT to generate a spectrum display.

This allows the same LED panels to serve as both an information display and a visual effect driven by music or other audio input.

## Extensible Display Modes

Scrolling text, video, paint, and audio effects are implemented as separate display modes derived from a shared base class.

Each mode exposes common entry points for initialization, shutdown, state updates, Bitmap drawing, and window events. The main loop only runs the selected mode, so adding a new visualization does not require rebuilding the communication or preview pipeline.

## What I Learned

This project covered the complete system from the physical panels, electronics, and embedded firmware to the protocol and Windows application.

- Connecting a Windows GUI to hardware control
- Developing ATmega32 circuits, boards, and AVR firmware
- Image conversion for low-resolution monochrome output
- Designing a UART broadcast topology and data format for multiple boards
- Real-time audio processing with capture, circular buffers, and FFT
- Structuring interchangeable and extensible display modes

## Technologies

- ATmega32 / AVR / C
- Eagle
- UART
- C# / .NET Framework / Windows Forms / SerialPort
- DirectShow
- NAudio / ASIO
- Math.NET Numerics / FFT
- Bitmap image processing
- Custom LED matrix panels
