## Overview

DMXBOX is an automated lighting-control system designed for use at events. It is a Go-based redevelopment of raspi-DMXBox, an earlier system built with Raspberry Pi and Python, intended to resolve issues discovered while preparing it for real-world operation.

I am solely responsible for its design, implementation, and testing.

## Background

As the original system moved closer to practical use, several limitations became apparent:

- Its architecture had become difficult to extend and maintain
- It supported Linux only
- It could not recover when a USB-DMX device was disconnected during operation

Rather than patching each issue separately, I redesigned the system as DMXBOX with extensibility and operational stability as primary goals.

## Technology

- Go backend
- Browser-based administration interface built with React, TypeScript, and Material UI
- HTTP API and TCP control inputs
- USB-DMX (FTDI), Art-Net, and OSC outputs
- Builds for Windows x86-64, Linux x86-64, and Linux ARM64

In release builds, the Go backend serves both the HTTP API and the compiled administration interface. This allows the system to run as a single application on one computer.

## Main Features

- 512-channel DMX output
- Fade, Cut, Mute, and Unmute controls
- Group-based lighting management
- Device models for dimmers and white-color lights
- Browser-based operation and configuration
- Module-level hot reload after configuration changes

## Technical Challenges

DMXBOX was my first project written in Go. Learning the language and understanding idiomatic Go while building a working system was the first major challenge.

I also needed an architecture that could meet several requirements at once:

- Reload configuration without stopping the system
- Recover from USB-DMX disconnection
- Support future extensions
- Remain stable during continuous event operation

## Solutions

I learned Go through repeated implementation, research, and incremental improvement of the codebase.

The backend manages HTTP, TCP, DMX, and OSC as independent modules. Each module follows a common lifecycle for initialization, execution, shutdown, and message handling.

When configuration is saved from the administration interface, it is persisted before the module manager broadcasts a reload message. Each module restarts through a `Stop → Initialize → Run` sequence, rebuilding its state with the new configuration without stopping the entire process. The same module-level restart design can also be used when system errors occur.

For USB-DMX output, a failed write closes the FTDI port and the next output cycle attempts to open it again. This provides an additional recovery path for the device-disconnection issue found in the original system.

To improve reliability, I added tests for the Go backend modules and HTTP API as well as the frontend configuration screens and control components. The tests aim to cover both expected behavior and irregular scenarios, with a target of 80% code coverage.

## Operational Status

DMXBOX is scheduled for use at an event in September 2026. During preliminary testing, the system operated successfully and was able to integrate with other systems.

## Future Improvements

Several architectural issues remain as the system continues to evolve:

- Improve the usability of the module engine
- Extend the messaging system beyond its current one-way communication model
- Simplify areas of the architecture that have become uneven as features were added

I plan to continue improving maintainability and extensibility based on the results of its first live event operation.
