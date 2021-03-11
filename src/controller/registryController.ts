import { Address, IN3 } from 'in3-wasm';
import { registryABI, registryAddress } from '../configs/registry.config';

export default class RegistryController {
    /**
     *
     */
    constructor(private readonly _in3Client: IN3) {
        this.setup();
    }

    private _contractObject: any = null;
    
    public async FetchTotalNodes(): Promise<number> {
        if (!this.IsReady) {
            return 0;
        }
        return await this._contractObject.totalNodes();
    }

    public async FetchRegistryDataAddress(): Promise<Address> {
        if (!this.IsReady) {
            return "";
        }        
        return await this._contractObject.nodeRegistryData();
    }
    
    public async FetchBlockRegistryAddress(): Promise<Address> {
        if (!this.IsReady) {
            return "";
        }        
        return await this._contractObject.blockRegistry();
    }

    private setup() {
        try {
            if (!this._in3Client) {
                return;
            }
            this._contractObject = this._in3Client.eth.contractAt(registryABI, registryAddress);
        } catch (error) {
            console.log('setup(err): ', error);
        }
    }

    private get IsReady() {
        return !!this._in3Client && !!this._contractObject;
    }
}