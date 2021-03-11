class Config {
    private _appName = 'Registry Viewer';   

    public get AppName() {
        return this._appName;
    }
}
const config = new Config();
export default config;
