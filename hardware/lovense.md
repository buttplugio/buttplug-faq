# Lovense Devices

## Should I use a Bluetooth Dongle, a Lovense Dongle, or Lovense Connect?

First and foremost: **WHICHEVER ANSWER YOU CHOOSE HERE, ONLY CHOOSE ONE. USING MULTIPLE LOVENSE CONNECTION SOLUTIONS WILL LEAD TO PAIN.**

### Bluetooth Dongle

As with most of our toy support, we recommend using a regular Bluetooth LE Dongle with Lovense toys. The specific dongle we recommend is in the Bluetooth section of this FAQ. Bluetooth Dongles are the most reliable and usually least laggy way to access toys.

### Lovense Connect

Lovense Connect is an app released by Lovense for Cam Models ([iOS](https://apps.apple.com/us/app/lovense-connect/id1273067916), [Android](https://play.google.com/store/apps/details?id=com.lovense.connect&hl=en_US&gl=US)) that _is different from Lovense Remote_. Lovense Connect allows users to connect their toy to their phone, then connect from a laptop/desktop on the same network to the phone, without having to route all commands through a remote server.

Lovense Connect should be used if:

- You plan on moving around a LOT (like, say in a large VR playspace) and move out of range of your
  bluetooth radio.
- You are having problems with your bluetooth dropping out with toys like the hush or edge, and
  don't want to deal with a bluetooth dongle on a USB extension

Lovense Connect tends to be slightly laggier than bluetooth, somewhat on par with the Lovense Dongle, though this can also depend on your WiFi setup. The main problem with Connect is that, if it doesn't work out of the box, debugging may require advanced networking knowledge. If you are having problems with Connect, see the next section.

### Lovense Dongle

You should only use a Lovense Dongle if:

- You are on Windows 7
- You're waiting on your actual bluetooth dongle to arrive (and if you haven't ordered on, go ahead
  and do so)

The Lovense Dongle was made by Lovense to provide them with an easy-to-support way of connecting toys to desktops/laptops, without having to deal with specifics of different operating systems. That said, it's just not a great method for connection.

::: warning Lovense Dongle Explanation For Nerds

The Lovense Dongle is just a Nordic nrf52840 acting as a BLE to UART or HID bridge, depending on which version of the dongle you have. Older Lovense Dongles (earlier than 2018 or so) have a black circuit board which can be seen under the USB connector side, and work as a BLE to UART/Serial converter. Newer Lovense Dongles have a white circuit board and work as a BLE to HID converter.

Due to these dongles relaying over 2 communication mediums and having to run through an extra ARM processor to translate commands, they tend to be slower than just hooking up a regular old Bluetooth LE radio to your computer. This is why they seem laggy. Also, due to the firmware on the nrf52840, only 2 toys can be connected to a Lovense dongle simultaneously (and for Buttplug, we currently only support 1 toy [because qDot doesn't want to deal with fixing it](https://github.com/buttplugio/buttplug/issues/309)).

The reason that Lovense put the dongle out is that both Serial and HID are handled by operating systems in fairly standard ways, meaning the same code for the dongle will work on Win 7/8.1/10/11. Using actual LE Bluetooth on Windows means only having support for certain (but not all) versions of Windows 10 (MS never backported bluetooth to Win 7/8.1, and both OSes are now well past EOL support), and all versions of Windows 11. Since Lovense's user base is far larger than that of Buttplug's, and with far more variation in user hardware and experience, this ended up working best for their engineering and support.

But if you're the kind of nerd that reads this whole section and understood it, just use fucking Bluetooth, ok?

:::

## I can't get Intiface/Buttplug to find Lovense Connect devices

Unfortunately, the way Lovense Connect works may not work with many default network setups. Below are a few random suggestions to try if you can't get Intiface or Buttplug based programs to connect to Lovense Connect.

### Make sure Lovense Connect is activated in Intiface/Buttplug

Lovense Connect is **not on by default in Intiface or Buttplug**. Since usage of Lovense Connect requires contacting Lovense's servers for setup, it's considered opt-in, not opt-out. Make sure you've turned on the Lovense Connect Service in Intiface Desktop if you're using that. If you're using a program that integrates Buttplug without using Intiface, you may need to contact the developer directly to ask about htis.

### Make sure your Desktop/Laptop is getting the right info

If:

- Your phone is on
- You have Lovense Connect up
- Your toy is connected to Lovense Connect

You should be able to go to [https://api.lovense.com/api/lan/getToys](https://api.lovense.com/api/lan/getToys) and see something like

```json
{"192-168-1-2.lovense.club":{"deviceId":"connect_a9785218975ba98bd78398712","domain":"192-168-1-2.lovense.club","httpPort":20010,"wsPort":20010,"httpsPort":30010,"wssPort":30010,"toyJson":"{}","platform":"ios","appVersion":"2.6.3","toys":{}}}
```

If all you see is

```json
{}
```

This means that your phone and laptop/desktop can't identify each other. If this is the case, continue on to the next steps.

### Make sure you're using a DNS server that is compatible

If you're using a default setup wifi in a cable modem, the problem may be that your ISP/cable company/etc's DNS server doesn't work with Lovense Connect. Try changing the DNS server to 1.1.1.1 (Cloudflare) or 8.8.8.8 (Google). Both of these are public DNS servers known to work with Lovense Connect.

### Make sure you're not on IPv6

Lovense Connect does not work with IPv6 networks. You'll need to make sure you're on IPv4.

### If this still doesn't help and/or you aren't good at networking

This section is an in-depth explanation of how Lovense Connect works. Hand this to your local networking expert and/or grown-up (these two things may not always overlap)

::: warning Lovense Connect Explanation for Nerds

Hello nerd. Prepare to sigh and be tired.

First off, how Lovense Connect works: Lovense Connect hosts two types of services off its mobile app: HTTP and Websockets. Whenever a Lovense Connect app is queried, it will hand back 4 ports to connect to: HTTP, HTTPS, WS, and WSS. For simplicity sake, Buttplug will always use HTTP. Once connected, apps talk a special JSON based protocol over whichever port was chosen.

Lovense Connect uses a very weird setup for what is basically NAT punching, since robust local discovery still isn't a thing in the year of our lord 2022. When a phone starts the Lovense Connect app, it registers itself with Lovense's servers. Other systems on the same network _should_ be able to see the phone via the [Lovense API endpoint](https://api.lovense.com/api/lan/getToys) mentioned above. However, ONLY systems that Lovense thinks are on the same network can see this. Lovense handles this by basically trying to guess whether queries are coming from the same IP. This is why IPv6 won't work, because Lovense can't reason correctly about NAT for that.

Issues with Lovense Connect not working usually involve:

- Wifi and Wired networks being on different subnets
- Wifi and Wired networks being misconfigured internally

So those are two things to check.

Note that this next part *should* be bypassed by Buttplug, but it's good to know just in case:

DNS issues usually arise because Lovense does some EXTREMELY sketchy shit with domains and certificates. As the Lovense Connect API needs to be usable from web browsers (so people can build webpages that control toys through Lovense Connect), and possibly from HTTPS sites in web browsers, Lovense Connect has to host a secure site on the user's phone. To do this, Lovense uses the local lovense.club domain. The Lovense Connect app is distributed with a private certificate wildcarded for the lovense.club domain, and local IPs are bounced through the domain's DNS. So for instance, if your desktop is 192.168.1.2 and your mobile phone is 192.168.1.3, querying the API endpoint will tell your desktop to connect to 192-168-1-3.lovense.club. Your desktop can then make an HTTPS request to 192-168-1-3.lovense.club, which then routes to your phone, but your phone will return the wildcarded lovense.club cert.

Buttplug gets around this by only using HTTP (since we're not really planning on doing this from a browser) and parsing the IP out of the lovense.club URL handed to us by the Buttplug API. Therefore, DNS *shouldn't* be an issue, but there's always the chance we missed something. If you find that we did, please contact us via the methods on the front page of the FAQ.

:::
