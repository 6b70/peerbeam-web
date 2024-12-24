# PeerBeam

PeerBeam is a lightweight file transfer web app, built with SvelteKit, for fast, secure, and direct device-to-device file sharing through WebRTC. A signaling server is used for initial connection setup, but file transfer occurs directly between devices.

## How It Works

1. **Generate a Peer ID**: When you open the site, it generates a unique Peer ID that identifies your session.
2. **Establish Connection**: The Peer ID can be shared via QR code or link. These IDs are matched on the signaling server, allowing both devices to exchange session descriptors.
3. **File Transfer**: Once the connection is established, files are transferred directly between devices through WebRTC.

This setup works:
- Between devices on the same local network
- Across networks 
- Across mobile and desktop devices / browsers

### Are There Any Caveats?
A small percentage of users are connecting behind symmetric NATs. When two devices behind symmetric NATs try to connect, NAT traversal won't work. 
To get around this, traffic can be proxied through a TURN server. Unlike STUN servers, which are just used to establish the connection, TURN servers are intermediaries for the actual data transfer, so they eat up a lot of bandwith.
Hosting a TURN server is planned for this project to improve connectivity in this case.

## Development

You'll need Node.js and pnpm installed.

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build