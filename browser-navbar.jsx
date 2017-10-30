function normalizedUri(input) {
  var prefix = 'http://';

  if (!/^([^:\/]+)(:\/\/)/g.test(input) && !prefix.includes(input)) {
    input = prefix + input;
  }

  return input;
}

var BrowserNavbarBtn = React.createClass({
  render: function() {
    return <a href="#" className={this.props.disabled?'disabled':''} title={this.props.title} onClick={this.props.onClick}><i className={'fa fa-'+this.props.icon} /></a>
  }
})

var BrowserDialogView = React.createClass({
  render: function() {
    return <div className="browser-dialog-modal">{this.props.menuOptions}</div>
  }
})

var BrowserMenuBtn = React.createClass({
  getInitialState: function() {
    return { menuVisible: false };
  },
  render: function() {
    let dialog = null
    if (this.props.menuVisible) {
      dialog = <BrowserDialogView onClick={this.props.onClickMenu} menuOptions={this.props.menuOptions} />
    }
    return <a href="#" className={this.props.disabled?'disabled':''} title={this.props.title} onClick={this.props.onClick}>
      <i className={'fa fa-'+this.props.icon} />
      {dialog}
    </a>
  },
  displayMenu: function() {
    var menu = this.props.menuClass;

  },
  onClickMenu: function() {
    
  }
})

var mainBrowserMenu = [

];

var BrowserNavbarLocation = React.createClass({
  onKeyDown: function (e) {
    if (e.keyCode == 13)
      this.props.onEnterLocation(normalizedUri(e.target.value))
  },
  onChange: function (e) {
    this.props.onChangeLocation(normalizedUri(e.target.value))
  },
  render: function() {
    return <input type="text" onKeyDown={this.onKeyDown} onChange={this.onChange} onContextMenu={this.props.onContextMenu} value={this.props.page.location} />
  }
})



var BrowserNavbar = React.createClass({
  render: function() {
    return <div id="browser-navbar">
      <BrowserNavbarBtn title="Rewind" icon="angle-double-left fa-lg" onClick={this.props.onClickHome} disabled={!this.props.page.canGoBack} />
      <BrowserNavbarBtn title="Back" icon="angle-left fa-lg" onClick={this.props.onClickBack} disabled={!this.props.page.canGoBack} />
      <BrowserNavbarBtn title="Forward" icon="angle-right fa-lg" onClick={this.props.onClickForward} disabled={!this.props.page.canGoForward} />
      <BrowserNavbarBtn title="Refresh" icon="circle-thin" onClick={this.props.onClickRefresh} disabled={!this.props.page.canRefresh} />
      <div className="input-group">
        <BrowserNavbarLocation onEnterLocation={this.props.onEnterLocation} onChangeLocation={this.props.onChangeLocation} onContextMenu={this.props.onLocationContextMenu} page={this.props.page} />
      </div>
      <BrowserMenuBtn title="Menu" icon="bars" onClick={this.props.onClickMenu} menuOptions={mainBrowserMenu} />
    </div>
  }
})
