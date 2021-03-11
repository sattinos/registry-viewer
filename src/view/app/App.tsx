import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';

import { appController } from '../../controller/appController';
import { registryAddress } from '../../configs/registry.config';
import AutoHeadersTable from '../../lib/view/autoHeadersTable';

export interface AppState {
  blocksPerDay: number;
  limit: number;
  fromBlockIndex: number;
  toBlockIndex: number;
  fromBlockNumber: number;
  toBlockNumber: number;
  isBusy: boolean;
}

const texts = {
  pageTitle: 'Incubed Network // mainnet',
  totalInActiveTitle: 'Number of inactive nodes',
  totalNodesTitle: 'Number of total nodes',
  appTitle: 'Registry Smart Contract Viewer'
};

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isBusy: false,
      blocksPerDay: 12000,
      limit: 5,
      fromBlockIndex: 1,
      toBlockIndex: 0,
      fromBlockNumber: 0,
      toBlockNumber: 0
    };
  }

  public async componentDidMount() {
    appController.updateView = this.forceUpdate.bind(this);
    await appController.setup();
  }

  public render() {
    return (
      <Container fluid className="bg">
        <h1 id='appTitle' className='center'>
          {texts.appTitle}
        </h1>
        <Row>
          <Col className="panelContainer" sm>
            <div className="panel">
              <div className="pageTitle">{texts.pageTitle}</div>
              <p>
                <b>Registry Address:</b>
                <div>
                  {registryAddress}
                </div>
              </p>
            </div>
          </Col>
          <Col className="panelContainer" sm>
            <div className="panel">
              <div>
                <div>
                  <b>Registry Data Address:</b>
                  <div>
                    {appController.registryDataAddress}
                  </div>
                </div>
                <br />
                <div>
                  <b>
                    Block Registry Address:
                  </b>
                  <div>
                    {appController.blockRegistryAddress}
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col className="panelContainer" sm>
            <div className="center panel">
              <div className='panelTitle'>
                {texts.totalInActiveTitle}
              </div>
              <div className='panelContent'>
                {appController.totalInActiveNodes} Nodes
              </div>
            </div>
          </Col>
          <Col className="panelContainer" sm>
            <div className="center panel">
              <div className='panelTitle'>
                {texts.totalNodesTitle}
              </div>
              <div className='panelContent'>
                {appController.totalNodes} Nodes
              </div>
            </div>
          </Col>
        </Row>

        {
          appController.activeNodes.length > 0 ?
            <div className='tableTitle'>
              Active Nodes
            </div> : null
        }
        <AutoHeadersTable rows={appController.activeNodes} headersClassName='headerCell' rowsClassName='cell' />

        {
          appController.inActiveNodes.length > 0 ?
            <div className='tableTitle'>
              InActive Nodes
            </div> : null          
        }
        
        <AutoHeadersTable rows={appController.inActiveNodes} headersClassName='headerCellInActive' rowsClassName='cellInActive' />

        {appController.status !== '' ?
          <div className="footer">
            {appController.status}
          </div>
          :
          null
        }
      </Container>
    );
  }

  setBusy(isBusy: boolean) {
    this.setState({
      isBusy
    });
  }
}

export default App;
