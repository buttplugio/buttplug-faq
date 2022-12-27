# DIY Hardware

The following section presents an extremely rough, vague guide to getting Buttplug working with DIY hardware. This is not a full overview of implementing hardware with Buttplug, but rather enough information to know what questions to ask when approaching Buttplug devs. We recommend also being familiar with the architecture of the library as laid out in the [Buttplug Developer Guide](https://buttplug-developer-guide.docs.buttplug.io) to completely grasp how hardware integrates with the library and systems.

Note that in many cases for toys that have common actuation methods (vibration/stroking/etc), **new hardware does not require changes being made to the library and no knowledge of Rust is needed**.

## What should I know before asking about Buttplug Support for my Hardware?

There are a few things to consider before trying to integrate your own hardware with Buttplug.

**Read everything here before contacting the Buttplug Devs.** Otherwise you'll probably just get sent here.

**Buttplug itself is not made to be a firmware protocol.** Trying to implement "Buttplug Messages" between your hardware and Buttplug just makes life harder on everyone. Design what you're going to design, and either build your own protocol or use one of the protocols we recommend below. Buttplug is made to fit multiple types of systems, so building our level of generic requirements into your one-off or small run DIY is a waste of time.

**You should have your hardware up and running with your own test code and protocols BEFORE trying to integrate with Buttplug.** Buttplug is a complicated piece of software with many moving parts, so you should make very sure you know your hardware works, otherwise it may become difficult to figure out where problems lie in the system.

**You may not need to understand Buttplug fully, but you need to understand your own hardware and communication methods when asking for help.** The Buttplug Dev team does have embedded engineers on it, but that does not mean you can rely on them to debug issues in your specific setup, as none of them are psychic. You'll need to be knowledgable of what you've built and able to describe what's going wrong when asking for help.

**The Buttplug Dev Team will not be able to help implement hardware communication for you if you are not well-versed in programming.** The team is very busy with the library and do not have time to develop for one-off hardware. You'll need to find your own developers to help you out, and the Buttplug dev team can at least answer their questions.

## What are the basic steps for adding hardware I built in Buttplug?

Buttplug is built in such a way that many new devices can most likely be added without updates to the library, and possibly without even having to write code at all.

Devices in Buttplug consist of 2 components:

- The "Device Implementation", which is how Buttplug communicates with the hardware. This can be
  Bluetooth, Serial, HID, Network, etc...
- The "Protocol", which is the language Buttplug uses to communicate with the hardware. There are
  already 10s of protocols implemented in Buttplug, like Lovense, Tcode, etc... Using a protocol that is already built into the library means your device may "just work". We present some recommendations on this in the sections below.

Once you know how you'll communicate and what protocol you'll be using, this information will need to be added to the _User Device Configuration File_.

_Device Configuration File(s)_ are how Buttplug identifies and figures out how to communicate with hardware. [You can see the latest Device Configuration File here](https://buttplug-rs-device-config.buttplug.io/), or [the repo for the device configuration file here](https://github.com/buttplugio/buttplug/tree/master/buttplug/buttplug-device-config). This base file is built into Buttplug, and handles most configuration for major commercial hardware. It defines things like device names, ways to identify and access devices (bluetooth information, VID/PID for USB or HID, ports/bauds/other config for Serial Ports).

For DIY hardware, as well as hardware using systems that may require local setup, there is the _User Device Configuration File_. For instance, for hardware that communicates over serial ports, the user needs to tell the library which serial port on their machine that that hardware is hooked up to. This local information is stored in the _User Device Configuration File_, and merged with the main _Device Configuration File_ when Buttplug is loaded. This addition is not automatic, but Intiface Desktop and Intiface CLI both have ways of handling this, which we explain in another section below.

If your hardware is special enough that it requires a new protocol, or possibly new actuation, please [contact the developers using the methods listed on the front page of the FAQ](/) and we'll see what we can work out. Even if you need a new protocol or actuation, you can still use raw messages to verify whether or not your hardware at least works with the library.

## What communication method should I use with Buttplug?

This is really up to you and depends on the processing system you are using with your hardware. Buttplug supports a wealth of connection methods, including Bluetooth LE, Serial, HID, and websockets, so this is more a question for the capabilities of your system than it is about what Buttplug can handle.

## What protocol should I use in my DIY Hardware?

As stated before, Buttplug itself does not make a good toy control protocol. You know how many speeds/positions/etc your hardware will be able to handle, so you should design for that, and then configure Buttplug to work with that.

If you don't have your own protocol already in mind, we recommend [TCode](https://stpihkal.docs.buttplug.io/protocols/tcode.html). TCode handles multiple types of movement and actuation, and is fairly simple to parse even on small embedded platforms. Multiple open source implementations exist on github.

**If you want something quick to test with**, we recommend specifying your device under the _raw_ protocol in Buttplug. No Buttplug applications support this protocol, so you'll need to write your own test code, but this test protocol allows you to send/receive raw data without any reformatting happening in the Buttplug library. It's the quickest way to make sure Buttplug can discover and talk to your hardware, after which you can continue work on an actual protocol that Buttplug can translate message for.

## How do I build and test my User Configuration File with Buttplug?

The User Configuration File is just a JSON file, so you can either edit it by hand, or use Intiface Desktop's device addition features (Note: At the time of this writing, Intiface Desktop's device addition features are extremely limited, but more are coming soon).

Right now, if you are at this point, it's probably best to contact the Buttplug devs on how to do this. Automated tools will be available in the future for this.

## Buttplug doesn't support how my hardware moves/communicates/etc, what do I do?

If your machine does something that Buttplug doesn't currently support, please [contact the developers using the methods listed on the front page of the FAQ](/). We can discuss how to get support in the library.
