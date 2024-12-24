import { uniqueNamesGenerator, colors, animals, NumberDictionary } from 'unique-names-generator';
import type { Config } from 'unique-names-generator';
import type { FileTransfer } from '$lib';

const numberDict = NumberDictionary.generate({ min: 1, max: 999 });
const nameConfig: Config = {
    dictionaries: [colors, animals, numberDict],
    separator: '',
    style: 'capital',
}

export function generatePeerID(): string {
    return uniqueNamesGenerator(nameConfig);
}

export function downloadFile(blob: Blob, fileName: string): void {
    var a = document.createElement('a');
    document.body.append(a);
    a.download = fileName;
    a.href = URL.createObjectURL(blob);
    a.click();
    a.remove();
}

export async function readFileContent(file: File): Promise<FileTransfer> {
    const reader = new FileReader();

    try {
        const result = await new Promise<ArrayBuffer>((resolve, reject) => {
            reader.onload = () => resolve(reader.result as ArrayBuffer);
            reader.onerror = () => reject(reader.error);
            reader.readAsArrayBuffer(file);
        });

        return {
            fileName: file.name,
            fileType: file.type,
            data: new Blob([new Uint8Array(result)]),
        };
    } catch (error) {
        throw new Error(`Failed to read file: ${error}`);
    }
}