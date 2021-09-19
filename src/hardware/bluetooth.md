# General Bluetooth Device Questions

## What type Of Bluetooth dongle should I use?

You will need a Bluetooth 4 adapter of some kind. For Windows 10 and Linux desktops, we usually recommend the following adapter (Amazon US link, availability may differ in other countries):

[https://www.amazon.com/Plugable-Bluetooth-Adapter-Raspberry-Compatible/dp/B009ZIILLI](https://www.amazon.com/Plugable-Bluetooth-Adapter-Raspberry-Compatible/dp/B009ZIILLI)

This specific adapter is what our developers use to test the library. That said, most Bluetooth 4 dongles should work fine.

## Will my on-board/motherboard Bluetooth radio work?

For **macOS** hardware newer than 2012, the on-board radio works well. For pre-2012 macOS hardware, the aforementioned dongle is recommended.

For **Windows and Linux** desktops and laptops, we do not recommend using on-board radios. They usually have less broadcast range (**Note**: Radios that have an external antenna hooked up to them tend to work better, and may be exempt from this). We've also had many issues with the drivers that come with on-board bluetooth radios not working with our software. If you are using a system with an on-board radio and are having issues, we recommend buying the dongle listed above.

## Can I use a Bluetooth 5 dongle?

Bluetooth 5 dongles and radios are considered unsupported at the moment across all platforms. While
some may work on some platforms, they're new enough that we cannot confirm they will work for
everyone, and they have been observed to sometimes cause intermittent scanning and connection
problems. We recommend all users use BT4 dongles for now.

## Is there any way I can improve my bluetooth connection?

* Plugging dongles directly into towers/laptops can cause issues with line of sight and signal
  degredation. We recommend plugging dongles into either an external USB hub.
* Using a USB 2 hub may work better than using a USB 3 hub, as USB 3 hubs tend to emit EMI which can
  obscure the bluetooth radio.
* If you are in a situation where you may be moving around a lot (i.e. VR, cam modeling, etc...),
  another possible solution is to put a bluetooth USB dongle on the end of a USB extension cable,
  and place the dongle near you (or in cases where you're clothed, possibly in a pants pocket if
  available). This may alleviate disconnects and provide a more reliable connection.

In the end, remember: Radios are black magic, and there's only so much anyone can do here.

## Can I use my phone as a bluetooth device relay?

This is a possibility, but it depends on whether or not the application and hardware you're working
with support mobile platforms. At the moment, Buttplug only works on web for Android, and requires a
special browser for iOS. Native Android/iOS apps currently do not support Buttplug, though this may
change in the future.

Some toys, like Lovense, have special apps (like Lovense Connect) that allow users to use their
phone as the bluetooth connection. If Buttplug/Intiface support this capability, it will be listed
here in the brand specific questions section.

## I connected my bluetooth device to my phone, but my computer can't see it

If you connected your bluetooth device to your phone before connecting it to your desktop, you may
have paired it with your phone, meaning your device will not talk to any other machines. You will
need to unpair the device with your phone before you try connecting it to your desktop via Intiface
or other apps.

Most (but not all) Bluetooth LE devices do not need to be paired with machines in order to talk to
them. However, some brands (like WeVibe and Kiiroo) do have hardware that requires pairing. If a
piece of hardware is required to pair, it will be called out here in the brand specific questions
section.