import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

type LiteralPacket = { kind: 'literal'; version: number; value: number; };
type OperatorPacket = { kind: 'operator'; version: number; operator: number; packets: Packet[]; };
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

    protected part2(): number {
        const { rootPacket } = this.parseInput();
        return this.evaluate(rootPacket);
    }

    private evaluate(packet: Packet): number {
        if (packet.kind === 'literal') {
            return packet.value;
        }

        const packets = packet.packets;
        switch (packet.operator) {
            case 0: return packets.reduce((a, x) => a + this.evaluate(x), 0); // sum
            case 1: return packets.reduce((a, x) => a * this.evaluate(x), 1); // product
            case 2: return packets.map(x => this.evaluate(x)).reduce((a, x) => x < a ? x : a); // minimum
            case 3: return packets.map(x => this.evaluate(x)).reduce((a, x) => x > a ? x : a); // maximum
            case 5: return this.evaluate(packets[0]) > this.evaluate(packets[1]) ? 1 : 0; // greater than
            case 6: return this.evaluate(packets[0]) < this.evaluate(packets[1]) ? 1 : 0; // less than
            case 7: return this.evaluate(packets[0]) === this.evaluate(packets[1]) ? 1 : 0; // equal
            default: throw new Error(`Invalid operator: ${packet.operator}`);
        }
    }

    private parseInput() {
        const hex = /[0-9A-F]+/.exec(this.input)?.[0] ?? '';
        const binary = hex.split('').map(x => parseInt(x, 16).toString(2).padStart(4, '0')).join('');
        const flatPackets: Packet[] = [];
        return { rootPacket: this.parsePacket(binary, flatPackets).packet, flatPackets };
    }

    private parsePacket(binary: string, flatPackets: Packet[]) {
        const literalPacket = /^(?<version>\d{3})100(?<data>(?:1\d{4})*0\d{4})/;
        const lengthPacketHeader = /^(?<version>\d{3})(?<operator>(?!100)\d{3})0(?<length>\d{15})/;
        const countPacketHeader = /^(?<version>\d{3})(?<operator>(?!100)\d{3})1(?<count>\d{11})/;

        let match: RegExpExecArray | null;
        if ((match = literalPacket.exec(binary))) {
            return this.parseLiteralPacket(match, flatPackets);
        } else if ((match = lengthPacketHeader.exec(binary))) {
            return this.parseOperatorPacket(binary, match, flatPackets);
        } else if ((match = countPacketHeader.exec(binary))) {
            return this.parseOperatorPacket(binary, match, flatPackets);
        }

        throw new Error(`Unknown packet format: ${binary}`);
    }

    private parseLiteralPacket(match: RegExpExecArray, flatPackets: Packet[]) {
        const { version, data } = match.groups!;
        const packet = <LiteralPacket>{
            kind: 'literal',
            version: parseInt(version, 2),
            value: parseInt(regexMatches(/\d{5}/g, data).map(x => x[0].slice(1)).join(''), 2)
        };
        flatPackets.push(packet);

        return { packet, length: match[0].length };
    }

    private parseOperatorPacket(binary: string, match: RegExpExecArray, flatPackets: Packet[]) {
        const { version, operator, length, count } = match.groups!;
        const headerLength = match[0].length;
        const packet = <OperatorPacket>{
            kind: 'operator',
            version: parseInt(version, 2),
            operator: parseInt(operator, 2),
            packets: []
        };
        flatPackets.push(packet);

        const parseInnerPacket = (from: number) => {
            const { packet: innerPacket, length: innerLength } = this.parsePacket(binary.slice(from), flatPackets);
            packet.packets.push(innerPacket);
            return innerLength;
        };

        let packetLength = headerLength;
        if (length !== undefined) {
            const innerLengthTotal = parseInt(length, 2);
            while (packetLength - headerLength < innerLengthTotal) { packetLength += parseInnerPacket(packetLength); }
        } else {
            const packetCount = parseInt(count, 2);
            for (let i = 0; i < packetCount; i++) { packetLength += parseInnerPacket(packetLength); }
        }

        return { packet, length: packetLength };
    }
}
