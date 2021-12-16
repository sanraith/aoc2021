import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

interface PacketBase { version: number; }
interface LiteralPacket extends PacketBase { kind: 'literal'; value: number; }
interface OperatorPacket extends PacketBase { kind: 'operator'; operator: number; packets: Packet[]; }
type Packet = LiteralPacket | OperatorPacket;

@solutionInfo({
    day: 16,
    title: 'Packet Decoder'
})
export class Day16 extends SolutionBase {

    protected part1(): number {
        const { flatPackets } = this.parseInput();
        return flatPackets.reduce((a, x) => a + x.version, 0);
    }

    protected part2(): string | number {
        this.noSolution();
    }

    private parseInput() {
        console.log();
        const hex = /[A-F0-9]+/.exec(this.input)?.[0] ?? '';
        const binary = hex.split('').map(x => parseInt(x, 16).toString(2).padStart(4, '0')).join('');
        return this.parsePacket(binary);
    }

    private parsePacket(binary: string, flatPackets?: Packet[]) {
        flatPackets ??= [];
        const literalPacket = /^(?<version>\d{3})100(?<data>(?:1\d{4})*0\d{4})/;
        const lengthPacketHeader = /^(?<version>\d{3})(?<operator>(?!100)\d{3})0(?<length>\d{15})/;
        const countPacketHeader = /^(?<version>\d{3})(?<operator>(?!100)\d{3})1(?<count>\d{11})/;

        let match: RegExpExecArray | null;
        let packet: Packet;
        let readLength = 0;
        if ((match = literalPacket.exec(binary))) {
            const { version, data } = match.groups!;

            packet = <LiteralPacket>{
                kind: 'literal',
                version: parseInt(version, 2),
                value: parseInt(regexMatches(/\d{5}/g, data).map(x => x[0].slice(1)).join(''), 2)
            };
            readLength += match[0].length;

        } else if ((match = lengthPacketHeader.exec(binary))) {
            const { version, operator, length } = match.groups!;
            const innerLengthTotal = parseInt(length, 2);
            const headerLength = match[0].length;
            let innerStart = headerLength;
            packet = <OperatorPacket>{
                kind: 'operator',
                version: parseInt(version, 2),
                operator: parseInt(operator, 2),
                packets: []
            };

            while (innerStart - headerLength < innerLengthTotal) {
                const { packet: innerPacket, length: innerLength } = this.parsePacket(binary.slice(innerStart), flatPackets);
                innerStart += innerLength;
                packet.packets.push(innerPacket);

            }
            readLength += innerStart;

        } else if ((match = countPacketHeader.exec(binary))) {
            const { version, operator, count } = match.groups!;
            const packetCount = parseInt(count, 2);
            packet = <OperatorPacket>{
                kind: 'operator',
                version: parseInt(version, 2),
                operator: parseInt(operator, 2),
                packets: []
            };

            let innerStart = match[0].length;
            for (let i = 0; i < packetCount; i++) {
                const { packet: innerPacket, length: innerLength } = this.parsePacket(binary.slice(innerStart), flatPackets);
                innerStart += innerLength;
                packet.packets.push(innerPacket);
            }
            readLength += innerStart;

        } else {
            throw new Error();
        }

        flatPackets.push(packet);
        return { packet, length: readLength, flatPackets };
    }
}
