import { Address } from 'in3-wasm';

export interface SignerInformation {
    index: string;
    lockedTime: string;
    owner: Address;
    stage: string;
    depositAmount: string;
};

export function CreateSignerInformation(data: any[]): SignerInformation {
    return {
        lockedTime: data[0],
        owner: data[1],
        stage: data[2],
        depositAmount: data[3],
        index: data[4]
    };
}