import { Address } from 'in3-wasm';
import Web3 from 'web3';
import { dataNodeABI } from '../configs/dataNode.config';
import { CreateNodeInformation, NodeInformation } from '../model/nodeInformation';
import { CreateSignerInformation, SignerInformation } from '../model/signerInformation';

export default class NodeRegistryDataController {
    /**
     *
     */
    constructor(private readonly _web3: Web3, private readonly _nodeRegisteryDataAddress: Address) {
        this.setup();
    }

    private _contractObject: any = null;

    /**
     * GetNodeInformation
       index: number     */
    public async GetNodeInformation(index: number): Promise<NodeInformation | undefined> {
        if (!this.IsReady) {
            return undefined;
        }
        return CreateNodeInformation(await this._contractObject.methods.getIn3NodeInformation(index).call());
    }

    public async GetSignerInformation(signerAddress: Address): Promise<SignerInformation | undefined> {
        if (!this.IsReady) {
            return undefined;
        }
        return CreateSignerInformation(await this._contractObject.methods.getSignerInformation(signerAddress).call());
    }

    private setup() {
        try {
            if (!this._web3) {
                return;
            }

            this._contractObject = new this._web3.eth.Contract(dataNodeABI, this._nodeRegisteryDataAddress);
        } catch (error) {
            console.log('NodeRegistryDataController.setup(err): ', error);
        }
    }

    private get IsReady() {
        return !!this._web3 && !!this._contractObject;
    }
}
