import axios from 'axios';
import { Address, IN3 } from 'in3-wasm';
import Web3 from 'web3';
import { NodeInformation } from '../model/nodeInformation';
import NodeRegistryDataController from './nodeRegistryDataController';
import RegistryController from './registryController';

class AppController {
    private _in3Client: IN3 | undefined = undefined;
    private _web3: Web3 | undefined = undefined;
    private _contractObject: any = undefined;
    private _totalNodes: number = 0;
    private _totalInActiveNodes: number = 0;
    private _registryController: RegistryController | undefined = undefined;
    private _nodeRegistryDataController: NodeRegistryDataController | undefined = undefined;
    private _activeNodes: any[] = [];

    private _inActiveNodes: any[] = [];
    private _registryDataAddress: Address = 'n/a';
    private _blockRegistryAddress: Address = 'n/a';
    private _status = '';

    public setup = async () => {
        try {
            this._inActiveNodes = [];
            this._activeNodes = [];

            this._status = "setting up IN3...";
            this.updateView();
            this._in3Client = new IN3({
                chainId: 'mainnet'
            });

            this._web3 = new Web3(this._in3Client.createWeb3Provider());

            if (this._in3Client && this._web3) {
                this._status = "fetching registry addresses...";
                this.updateView();
                this._registryController = new RegistryController(this._in3Client);
                this._registryDataAddress = await this._registryController.FetchRegistryDataAddress();
                this._blockRegistryAddress = await this._registryController.FetchBlockRegistryAddress();

                this._status = "fetching total nodes....";
                this.updateView();

                this._nodeRegistryDataController = new NodeRegistryDataController(this._web3, this._registryDataAddress);
                this._totalNodes = await this._registryController.FetchTotalNodes();
                this.updateView();

                for (let nodeIndex = 0; nodeIndex < this._totalNodes; nodeIndex++) {
                    this._status = `fetching node ${nodeIndex}/${this._totalNodes} info`;
                    this.updateView();

                    const nodeInfo = await this._nodeRegistryDataController.GetNodeInformation(nodeIndex);
                    if (nodeInfo) {
                        this._status = `is active ${nodeInfo.address}...`;
                        const isActive = await this.isActive(nodeInfo);
                        if (!isActive) {
                            this._totalInActiveNodes++;
                        }
                        this.updateView();
                        this._status = `fetching node ${nodeIndex}/${this._totalNodes} signer`;
                        const signerInfo = await this._nodeRegistryDataController.GetSignerInformation(nodeInfo.address);
                        if (signerInfo) {
                            if (isActive) {
                                this._activeNodes.push({ ...nodeInfo, ...signerInfo });
                            } else {
                                this._inActiveNodes.push({ ...nodeInfo, ...signerInfo });
                            }
                            this.updateView();
                        }
                    }
                }
                this._status = ``;
                this.updateView();
            }
            this.updateView();
        } catch (error) {
            console.error('failed: ', error);
            this._status = `failed: ${error}`;
            this.updateView();
        }
    }

    public get totalNodes() {
        return this._totalNodes.toString();
    }

    public get contractObject() {
        return this._contractObject;
    }

    public get registryDataAddress() {
        return this._registryDataAddress;
    }

    public get blockRegistryAddress() {
        return this._blockRegistryAddress;
    }

    public get activeNodes() {
        return this._activeNodes;
    }

    public get inActiveNodes() {
        return this._inActiveNodes;
    }

    public get status() {
        return this._status;
    }

    public get totalInActiveNodes() {
        return this._totalInActiveNodes;
    }

    public get isConnected() {
        return !!this._in3Client;
    }

    /**
     * In order to know whether a node is active or not, we send post request to its url with empty body. If no response, then it is inactive.
     * @param url node url
     */
    private async isActive(node: NodeInformation) {
        try {
            await axios.post(node.url, {});
            return true;
        } catch (error) {
            return false;
        }
    }

    public updateView = () => { }
}

export const appController = new AppController();
