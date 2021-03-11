import { Address, Hash } from 'in3-wasm';
export interface NodeInformation {
    url: string;
    deposit: string;
    registerTime: string;
    props: string;
    weight: string;
    address: Address;
    proofHash: Hash;
};

export function CreateNodeInformation(data: any[]): NodeInformation {
    return {
        url: data[0],
        deposit: `${(parseInt(data[1])/1000000000000)}`,
        registerTime: new Date(parseFloat(data[2])*1000).toISOString() ,
        props: data[3],
        weight: data[4],
        address: data[5],
        proofHash: data[6]
    };
}
