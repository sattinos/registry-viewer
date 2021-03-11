import ReactDOM from 'react-dom';
import App from './App';
import { appController } from '../../controller/appController';

jest.setTimeout(5000000); // 10 second timeout

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should fetch information from  blockchain network successfully', async () => {
  await appController.setup();
  expect(appController.isConnected).toBe(true);
  expect(appController.contractObject).toBeDefined();
  expect(appController.registryDataAddress).toBeDefined();
  expect(appController.blockRegistryAddress).toBeDefined();
  expect(appController.activeNodes).toBeDefined();  
  expect(appController.activeNodes.length).toBeGreaterThan(0);
  expect(appController.inActiveNodes.length).toBeLessThan(appController.activeNodes.length);  
  
  expect(appController.activeNodes[0].url).toBeDefined();
  expect(appController.activeNodes[0].deposit).toBeDefined();
  expect(appController.activeNodes[0].registerTime).toBeDefined();
  expect(appController.activeNodes[0].props).toBeDefined();
  expect(appController.activeNodes[0].weight).toBeDefined();
  expect(appController.activeNodes[0].address).toBeDefined();
  expect(appController.activeNodes[0].proofHash).toBeDefined();
  expect(appController.activeNodes[0].lockedTime).toBeDefined();
  expect(appController.activeNodes[0].owner).toBeDefined();
  expect(appController.activeNodes[0].stage).toBeDefined();
  expect(appController.activeNodes[0].depositAmount).toBeDefined();
  expect(appController.activeNodes[0].index).toBeDefined();
});
