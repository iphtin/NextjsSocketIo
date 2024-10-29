import Peer from 'simple-peer';

export type SocketUser = {
    userId: string;
    socketId: string;
    username: string;
}

export type OngoingCall = {
    partcipants: Partcipants;
    isRinging: boolean;
}

export type Partcipants = {
    caller: SocketUser;
    receiver: SocketUser;
}

export type User = {
    userId: string;
    username: string;
}

export type SendMessage = {
    id: string;
    text: string;
    fromSelf: string;
    recipientId: string;
}

export type Notification = {
    sender: SocketUser;
    receiver: SocketUser;
}

export type PeerData = {
    peerConnection: Peer.Instance;
    stream: MediaStream | undefined;
    participantUser: SocketUser;
  }